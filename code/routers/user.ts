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
 * /api/user:
 *   post:
 *     summary: Creación de un nuevo usuario.
 *     tags: 
 *       - User
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "exampleEmail@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12341234Aa"
 *               phone:
 *                 type: string
 *                 example: "+34123123123"
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente.
 *       500:
 *         description: Erorr interno (puede ser que el email no sea válido)
 */

userRouter.post(
	"/",
	[

	],
	controller.createUser
);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Realizar un login.
 *     tags: 
 *       - User
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "exampleEmail@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12341234Aa"
 * 
 *     responses:
 *       200:
 *         description: Login exitoso.
 *       500:
 *         description: Fallo de autenticación.
 */
userRouter.post(
	"/login",
	[

	],
	controller.login
);

/**
 * @swagger
 * /api/user/resetPassword:
 *   post:
 *     summary: Recibe un email para reiniciar la contraseña.
 *     tags: 
 *       - User
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "exampleEmail@gmail.com"
 * 
 *     responses:
 *       200:
 *         description: Email enviado exitosamente.
 *       500:
 *         description: Error al enviar el email de resetear la contraseña.
 */
userRouter.post(
	"/resetPassword",
	[

	],
	controller.resetPassword
);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtener todos los datos de un usuario para ver su perfil.
 *     tags: 
 *       - User
 * 
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 * 
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos exitosamente.
 *       500:
 *         description: Error buscar los datos de un usuario en particular.
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
 * /api/user:
 *   patch:
 *     summary: Actualiza los datos de un usuario.
 *     tags: 
 *       - User
 * 
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "exampleEmail@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12341234Aa"
 *               phone:
 *                 type: string
 *                 example: "+34123123123" 
 * 
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       500:
 *         description: Error al actualizar los datos del usuario. 
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
 * /api/user:
 *   delete:
 *     summary: Elimina un usuario.
 *     tags: 
 *       - User
 * 
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 * 
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       500:
 *         description: Error al eliminar un usuario. 
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
