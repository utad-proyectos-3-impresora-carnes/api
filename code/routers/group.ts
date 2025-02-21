import express from "express";
import controller from "../controllers/group";
import auth from "../middleware/auth";

/**
 * @swagger
 * tags:
 *   name: Group
 *   description: API endpoints for the groups of the database.
 */

/**
 * Objeto de router de los grupos.
 * Ofrece los siguientes endpoints:
 * - GET / -> devuelve todos los grupos en la base de datos
 * - GET /filtered -> devuelve los grupos que sigan una serie de filtros
 * - PATCH /print:id -> manda a imprir un carne con el id dado
 */
const groupRouter = express.Router();

/**
 * Obtener todos los grupos.
 */
groupRouter.get(
	"/",
	[

	],
	auth,
	controller.getAllGroups
);

/**
 * Obtener los grupos filtrados.
 */
groupRouter.get(
	"/filtered",
	[

	],
	auth,
	controller.getFilteredGroups
);

/**
 * Mandar a imprimir un grupo.
 */
groupRouter.patch(
	"/print",
	[

	],
	auth,
	controller.printGroup
);

// Exporta el router una vez definidos todos los endpointss.
export { groupRouter };
