import express from "express";
import controller from "../controllers/user";
import auth from "../middleware/auth";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for the users of the database.
 */

/**
 * Objeto de router del usuario.
 * Ofrece los siguientes endpoints:
 * - POST / -> Creación de usuario.
 * - POST /login -> Obtención de un token de inicio de sesión.
 * - POST /resetPassword -> Recibir un email para resetear la contraseña.
 * - GET /:id -> Obtención de todos los datos de un usuario para ver el perfil.
 * - PATCH /:id -> Actualización de un usuario identificado por su ID.
 * - DELETE /:id -> Eliminar un usuario basado en su ID.
 */
const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Creación de un nuevo usuario.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente.
 */
userRouter.post(
	"/",
	[

	],
	controller.createUser
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Realizar un login.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Login exitoso.
 */
userRouter.post(
	"/login",
	[

	],
	controller.login
);

/**
 * @swagger
 * /user/resetPassword:
 *   post:
 *     summary: Recibe un email para reiniciar la contraseña.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Email enviado exitosamente.
 */
userRouter.post(
	"/resetPassword",
	[

	],
	controller.resetPassword
);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtener todos los datos de un usuario para ver su perfil.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos exitosamente.
 */
userRouter.get(
	"/",
	[

	],
	auth,
	controller.getUserData
);

/**
 * @swagger
 * /user:
 *   patch:
 *     summary: Actualiza los datos de un usuario.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 */
userRouter.patch(
	"/",
	[

	],
	auth,
	controller.updateUser
);

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Elimina un usuario.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 */
userRouter.delete(
	"/",
	[

	],
	auth,
	controller.deleteUser
);

// Exporta el router una vez definidos todos los endpoints.
export { userRouter };
