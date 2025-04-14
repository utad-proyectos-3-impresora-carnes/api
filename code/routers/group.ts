import express from "express";
import * as controller from "../controllers/group";
import * as validator from "../validators/group";
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
 * - GET /metadata -> devuelve los metadatos de los grupos
 * - GET /allGroups -> devuelve todos los grupos en la base de datos
 * - GET /filtered -> devuelve los grupos que sigan una serie de filtros
 */
const groupRouter = express.Router();

/**
 * @swagger
 * /api/group/metadata:
 *   get:
 *     summary: Obtener los metadatos de los grupos
 *     tags: [Group]
 * 
 *     responses:
 *       200:
 *         description: Metadatos de los grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: MongoDBGenericObject
 */
groupRouter.get(
	"/metadata",
	auth,
	validator.getMetadata,
	controller.getMetadata
);

/**
 * @swagger
 * /api/group/allGroups:
 *   get:
 *     summary: Obtener todos los grupos
 *     tags: [Group]
 * 
 *     responses:
 *       200:
 *         description: Lista de todos los grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: MongoDBGenericObject
 */
groupRouter.get(
	"/allGroups",
	auth,
	validator.getAllGroups,
	controller.getAllGroups
);

/**
 * @swagger
 * /api/group/filtered:
 *   get:
 *     summary: Obtener los grupos filtrados
 *     tags: [Group]
 * 
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del grupo
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: Tipo del grupo
 *       - in: query
 *         name: creationYear
 *         schema:
 *           type: integer
 *         required: false
 *         description: Año en el que se creo el grupo
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Cantidad de datos a recibir
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: false
 *         description: Cantidad de datos a saltar
 * 
 *     responses:
 *       200:
 *         description: Lista de grupos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
groupRouter.get(
	"/filtered",
	auth,
	validator.getFilteredGroups,
	controller.getFilteredGroups
);

// Exporta el router una vez definidos todos los endpointss.
export default groupRouter;
