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
 * Checks if the memberId exists.
 */
export const checkMemberId = [

	param("memberId")
		.exists().withMessage("El id del miembro debe existir.")
		.notEmpty().withMessage("El id del miembro no puede estar vacío.")
		.isMongoId().withMessage("El id del miembro debe ser de mongoDB."),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]