import express from "express";
import controller from "../controllers/example";

/**
 * Objeto de router del usuario.
 * Ofrece los siguientes endpoints:
 * - POST / -> Creación de usuario.
 * - POST /login -> Obtención de un token de inicio de sesión.
 * - GET /:id -> Obtención de todos los datos de un usuario para ver el perfil.
 * - PATCH /:id -> Actualización de un usuario identificado por su ID.
 * - DELETE /:id -> Eliminar un usuario basado en su ID.
 */
const userRouter = express.Router();

/**
 * Asigna a cualquier request de tipo GET la función del controlador de ejemplo 'exampleGet'.
 */
exampleRouter.get("*", controller.exampleGet);


/**
 * Asigna a cualquier request de tipo POST la función del controlador de ejemplo 'examplePost'.
 */
exampleRouter.post("*", controller.examplePost);


/**
 * Asigna a cualquier request de tipo PUT la función del controlador de ejemplo 'examplePut'.
 */
exampleRouter.put("*", controller.examplePut);

/**
 * Asigna a cualquier request de tipo PATCH la función del controlador de ejemplo 'examplePatch'.
 */
exampleRouter.patch("*", controller.examplePatch);

/**
 * Asigna a cualquier request de tipo DELETE la función del controlador de ejemplo 'exampleDelete'.
 */
exampleRouter.delete("*", controller.exampleDelete);

// Exporta el router una vez definidos todos los endpoints.s
export { userRouter };
