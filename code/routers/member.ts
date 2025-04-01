import express from "express";
import * as controller from "../controllers/member";
import * as validator from "../validators/member";
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
 */
memberRouter.get(
	"/",
	auth,
	validator.getAllMembers,
	controller.getAllMembers
);

/**
 * @swagger
 * /api/member/filtered:
 *   get:
 *     summary: Obtener los miembros filtrados
 *     tags: 
 *       - Member
 * 
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del miembro
 *       - in: query
 *         name: dni
 *         schema:
 *           type: string
 *         required: false
 *         description: DNI o pasaporte del miembro
 *       - in: query
 *         name: group
 *         schema:
 *           type: string
 *         required: false
 *         description: Grupo en el que está inscrito el miembro
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: false
 *         description: Año en el que se añadió al miembro
 *       - in: query
 *         name: printed
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Si el carné ha sido ya impreso
 *
 *     responses:
 *       200:
 *         description: Lista de miembros filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
memberRouter.get(
	"/filtered",
	auth,
	validator.getFilteredMembers,
	controller.getFilteredMembers
);

/**
 * @swagger
 * /api/member/preview/{memberId}:
 *   get:
 *     summary: Obtener la previsualización de un carné
 *     tags: [Member]
 * 
 *     parameters:
 *       - in: path
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
	"/preview/:memberId",
	auth,
	validator.checkMemberId,
	validator.previewMemberCard,
	controller.previewMemberCard
);

/**
 * @swagger
 * /api/member/editMemberValidatioStatus/{memberId}:
 *   patch:
 *     summary: Edita el estado de validación de un miembro
 *     tags: [Member]
 * 
 *     parameters:
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del miembro
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               validationState:
 *                 type: string
 *                 example: "validated"
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
memberRouter.patch(
	"/editMemberValidatioStatus/:memberId",
	auth,
	validator.checkMemberId,
	validator.editMemberValidatioStatus,
	controller.editMemberValidatioStatus
);

/**
 * @swagger
 * /api/member/printMembers:
 *   patch:
 *     summary: Mandar a imprimir un miembro
 *     tags: [Member]
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             name: memberIds
 *             type: array
 *             items:
 *               type: string
 *             required: true
 *             description: ID del miembro
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
memberRouter.patch(
	"/printMembers",
	auth,
	validator.printMembers,
	controller.printMembers
);

// Exporta el router una vez definidos todos los endpointss.
export default memberRouter;
