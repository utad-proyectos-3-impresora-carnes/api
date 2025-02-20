import express from "express";
import controller from "../controllers/user";
import auth from "../middleware/auth";

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
 * Creación de un nuevo usuario.
 */
userRouter.post(
	"/",
	[

	],
	controller.createUser
);

/**
 * Realizar un login.
 */
userRouter.post(
	"/login",
	[

	],
	controller.login
);

/**
 * Recibe un email para reiniciar la contraseña.
 */
userRouter.post(
	"/resetPassword",
	[

	],
	controller.resetPassword
);

/**
 * Obtener todos los datos de un usuario para ver su perfil.
 */
userRouter.get(
	"/:id",
	[

	],
	auth,
	controller.getUserData
);

/**
 * Actualiza los datos de un usuario
 */
userRouter.patch(
	"/:id",
	[

	],
	auth,
	controller.updateUser
);

/**
 * Elemina un usuario.
 */
userRouter.delete(
	"/:id",
	[

	],
	auth,
	controller.deleteUser
);

// Exporta el router una vez definidos todos los endpoints.s
export { userRouter };
