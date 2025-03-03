import { param, query, body } from "express-validator";
import validateResults from "../utils/validator";

// export const validatorCreateItem = [
// 	check("name")
// 		.exists().withMessage("Must exist!!!")
// 		.notEmpty().withMessage("Can't be empty!!!")
// 		.isEmail().withMessage("Must be an email!!!"), //.isLength(min:5, max:90)
// 	check("album").exists().notEmpty(),
// 	check("cover").exists().notEmpty(),
// 	check("artist").exists().notEmpty(),
// 	check("artist.name").exists().notEmpty(),
// 	check("artist.nickname").exists().notEmpty(),
// 	check("artist.nationality").exists().notEmpty(),
// 	check("duration.start").exists().notEmpty().isInt(),
// 	check("duration.end").exists().notEmpty().isInt(),
// 	check("mediaId").exists().notEmpty().isMongoId(),
// 	(req: any, res: any, next: any) => validateResults(req, res, next)
// ]

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
		.isLength({ max: 25 }).withMessage("El máximo tamaño de este string es 25")
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