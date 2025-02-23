import express from "express";
import controller from "../controllers/member";
import auth from "../middleware/auth";

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: API endpoints for the members of the database.
 */

/**
 * Objeto de router de los miembros.
 * Ofrece los siguientes endpoints:
 * - GET / -> devuelve todos los miembros en la base de datos
 * - GET /filtered -> devuelve los miembros que sigan una serie de filtros
 * - GET /inGroup:groupId -> devuelve los miembros que pertenezcan a un grupo
 * - GET /preview -> devuelve la previsualización de como quedaría el carné de un miembro
 * - PATCH /print:id -> manda a imprir un carne con el id dado
 */
const memberRouter = express.Router();

/**
 * @swagger
 * /api/member/:
 *   get:
 *     summary: Obtener todos los miembros
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Lista de todos los miembros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
memberRouter.get(
	"/",
	[

	],
	auth,
	controller.getAllMembers
);

/**
 * @swagger
 * /api/member/filtered:
 *   get:
 *     summary: Obtener los miembros filtrados
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Lista de miembros filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
memberRouter.get(
	"/filtered",
	[

	],
	auth,
	controller.getFilteredMembers
);

/**
 * @swagger
 * /api/member/inGroup:
 *   get:
 *     summary: Obtener los miembros en un grupo
 *     tags: [Member]
 *     parameters:
 *       - in: query
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del grupo
 *     responses:
 *       200:
 *         description: Lista de miembros en el grupo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
memberRouter.get(
	"/inGroup",
	[

	],
	auth,
	controller.getMembersInGroup
);


/**
 * @swagger
 * /api/member/preview:
 *   get:
 *     summary: Obtener la previsualización de un carné
 *     tags: [Member]
 * 
 *     parameters:
 *       - in: query
 *         name: memberId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del miembro
 * 
 *     responses:
 *       200:
 *         description: Previsualización del carné
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 preview:
 *                   type: string
 *                   format: binary
 */
memberRouter.get(
	"/preview",
	[

	],
	auth,
	controller.previewMemberCard
);

/**
 * @swagger
 * /api/member/print:
 *   patch:
 *     summary: Mandar a imprimir un miembro
 *     tags: [Member]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del miembro
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
memberRouter.patch(
	"/print",
	[

	],
	auth,
	controller.printMember
);

// Exporta el router una vez definidos todos los endpointss.
export { memberRouter };
