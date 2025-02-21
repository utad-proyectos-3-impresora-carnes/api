import express from "express";
import controller from "../controllers/example";

/**
 * @swagger
 * tags:
 *   name: Example
 *   description: API endpoints for the example resource
 */

/**
 * Crea un objeto router.
 */
const exampleRouter = express.Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Obtener datos de ejemplo
 *     description: Retorna datos de ejemplo.
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Datos obtenidos exitosamente"
 */
exampleRouter.get("*", controller.exampleGet);

/**
 * @swagger
 * /api/example:
 *   post:
 *     summary: Crear un nuevo dato de ejemplo
 *     description: Crea un nuevo recurso de ejemplo.
 *     tags: [Example]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ejemplo"
 *     responses:
 *       201:
 *         description: Creado exitosamente
 */
exampleRouter.post("*", controller.examplePost);

/**
 * @swagger
 * /api/example:
 *   put:
 *     summary: Actualizar un dato de ejemplo
 *     description: Actualiza completamente un recurso de ejemplo.
 *     tags: [Example]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ejemplo actualizado"
 *     responses:
 *       200:
 *         description: Actualización exitosa
 */
exampleRouter.put("*", controller.examplePut);

/**
 * @swagger
 * /api/example:
 *   patch:
 *     summary: Modificar parcialmente un dato de ejemplo
 *     description: Modifica parcialmente un recurso de ejemplo.
 *     tags: [Example]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ejemplo modificado"
 *     responses:
 *       200:
 *         description: Modificación exitosa
 */
exampleRouter.patch("*", controller.examplePatch);

/**
 * @swagger
 * /api/example:
 *   delete:
 *     summary: Eliminar un dato de ejemplo
 *     description: Elimina un recurso de ejemplo.
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: Eliminación exitosa
 */
exampleRouter.delete("*", controller.exampleDelete);

export { exampleRouter };
