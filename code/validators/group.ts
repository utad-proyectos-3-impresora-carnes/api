import { param, query } from "express-validator";
import validateResults from "../utils/validator";
import { GroupTypes } from "../constants/groupTypes";

/**
 * Checks if the groupId exists.
 */
export const checkGroupId = [

	param("groupId")
		.exists().withMessage("El id del grupo debe existir.")
		.notEmpty().withMessage("El id del grupo no puede estar vacío.")
		.isMongoId().withMessage("El id del grupo debe ser de mongoDB."),

	(req: any, res: any, next: any) => validateResults(req, res, next)

];

/**
 * Validate the endpoint to get metadata.
 */
export const getMetadata = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

];

/**
 * Validate the endpoint to get all groups.
 */
export const getAllGroups = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

];

/**
 * Validate the endpoint to get filtered groups.
 */
export const getFilteredGroups = [

	query("name")
		.isString()
		.isLength({ max: 25 }).withMessage("El máximo tamaño del nombre es de 25 caracteres")
		.optional(),

	query("type")
		.isString()
		.isLength({ max: 25 }).withMessage("El máximo tamaño tipo de grupo es de 25 caracteres")
		.custom((param: GroupTypes) => {
			if (!Object.values(GroupTypes).includes(param)) {
				return false;
			}
			return true;
		})
		.withMessage("No es un valor de tipo de grupo válido")
		.optional(),

	query("creationYear")
		.isNumeric()
		.optional(),

	query("limit")
		.isNumeric()
		.optional(),

	query("offset")
		.isNumeric()
		.optional(),

	(req: any, res: any, next: any) => validateResults(req, res, next)

];