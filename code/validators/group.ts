import { param, query, body } from "express-validator";
import validateResults from "../utils/validator";

/**
 * Checks if the groupId exists.
 */
export const checkGroupId = [

	param("groupId")
		.exists().withMessage("El id del grupo debe existir.")
		.notEmpty().withMessage("El id del grupo no puede estar vacío.")
		.isMongoId().withMessage("El id del grupo debe ser de mongoDB."),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to get all groups.
 */
export const getAllGroups = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to get filtered groups.
 */
export const getFilteredGroups = [

	query("name")
		.isString()
		.isLength({ max: 25 }).withMessage("El máximo tamaño del nombre es de 25 caracteres")
		.optional(),

	query("type")
		.isNumeric()
		.optional(),

	query("creationYear")
		.isNumeric()
		.optional(),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to print groups.
 */
export const printGroup = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]