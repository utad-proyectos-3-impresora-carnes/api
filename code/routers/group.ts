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
 *               items:
 *                 $ref: '#/components/schemas/Group'
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
 *     responses:
 *       200:
 *         description: Lista de grupos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
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
 * /api/group/print:
 *   patch:
 *     summary: Mandar a imprimir un grupo
 *     tags: [Group]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del grupo
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
	"/print",
	[

	],
	auth,
	controller.printGroup
);

// Exporta el router una vez definidos todos los endpointss.
export { groupRouter };
