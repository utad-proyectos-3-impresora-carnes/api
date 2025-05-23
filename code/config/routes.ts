import express from "express";
import swaggerUi from 'swagger-ui-express';
import userRouter from "../routers/user";
import memberRouter from "../routers/member";
import groupRouter from "../routers/group";
import { swaggerDocs } from "./swagger";
import debugRouter from "../routers/debug";


/**
 * Crea un objeto router.
 */
const router = express.Router();

/**
 * Asigna un subdominio del servidor a un router en concreto.
 */
router.use('/api/user', userRouter);
router.use('/api/member', memberRouter);
router.use('/api/group', groupRouter);
router.use('/api/debug', debugRouter);

/**
 * Devuelve la documentación swagger.
 */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs()));


/**
 * Lo que devuelve si todos los demás routers por encima no se encontró la dirección buscada.
 * Tiene que estar abajo del todo porque los routers son como los switch, van de arriba abajo y si pillan un resultado válido no siguen buscando.
 */
router.use('*', function (req: any, res: any) {
	res.status(404).send(`
		<h1>404! Not found!</h1>
		<label>We recommend going to our docs on development <a href="http://${process.env.URL}:${process.env.PORT}/api-docs">Swagger</a></label>
		<label>Or try out the production docs <a href="${process.env.URL}/api-docs">Swagger</a></label>
		`);
});

//Exporta el router una vez definidos todos los sub routers.
export default router;