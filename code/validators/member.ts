import { param, query, body } from "express-validator";
import validateResults from "../utils/validator";

/**
 * Checks if the memberId exists.
 */
export const checkMemberId = [

	param("memberId")
		.exists().withMessage("El id del miembro debe existir.")
		.notEmpty().withMessage("El id del miembro no puede estar vacío.")
		.isMongoId().withMessage("El id del miembro debe ser de mongoDB."),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to get all members.
 */
export const getAllMembers = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to get filtered members.
 */
export const getFilteredMembers = [

	query("fullName")
		.isString()
		.isLength({ max: 50 }).withMessage("El nombre no puede tener más de 50 caracteres")
		.optional(),

	query("dni")
		.isString()
		.isLength({ max: 20 }).withMessage("El dni/pasaporte no puede tener más de 20 caracteres")
		.optional(),

	query("group")
		.isString()
		.isLength({ max: 25 }).withMessage("El máximo tamaño del nombre del grupo es de 25 caracteres")
		.optional(),

	query("year")
		.isNumeric().withMessage("El parámetro year debe ser un número (año con 4 cifras, ejemplo: 2000)")
		.optional(),

	query("printed")
		.isBoolean().withMessage("El parámetro printed debe ser un booleano")
		.optional(),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to preview a member.
 */
export const previewMemberCard = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to print a member.
 */
export const printMember = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]
