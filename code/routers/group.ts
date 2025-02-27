import express from "express";
import * as controller from "../controllers/group";
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
 * @swagger
 * /api/group/:
 *   get:
 *     summary: Obtener todos los grupos
 *     tags: [Group]
 *     responses:
 *       200:
 *         description: Lista de todos los grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
groupRouter.get(
	"/",
	[

	],
	auth,
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
 *         description: DNI o pasaporte del miembro
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         required: false
 *         description: Año en el que se creo el grupo
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
	[

	],
	auth,
	controller.getFilteredGroups
);

/**
 * @swagger
 * /api/group/print/{groupId}:
 *   patch:
 *     summary: Mandar a imprimir un grupo
 *     tags: [Group]
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del grupo
 * 
 *     responses:
 *       200:
 *         description: Confirmación de impresión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
groupRouter.patch(
	"/print:groupId",
	[

	],
	auth,
	controller.printGroup
);

// Exporta el router una vez definidos todos los endpointss.
export default groupRouter;
