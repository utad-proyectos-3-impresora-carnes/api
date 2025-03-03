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
 * Checks if the userId exists.
 */
export const checkUserId = [
	param("userId")
		.exists().withMessage("El id del usuario debe existir.")
		.notEmpty().withMessage("El id del usuario no puede estar vacío.")
		.isMongoId().withMessage("El id del usuario debe ser de mongoDB."),

	(req: any, res: any, next: any) => validateResults(req, res, next)
]