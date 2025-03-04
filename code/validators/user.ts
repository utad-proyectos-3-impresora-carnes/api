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

/**
 * Validate the endpoint to create a user.
 */
export const createUser = [

	body("email")
		.isEmail().withMessage("Se debe introducir un email"),

	body("password")
		.isString()
		.isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }).withMessage("La contraseña debe tener al menos una minúscula, una mayúscula y un número.")
		.isLength({ min: 8, max: 50 }).withMessage("La contraseña debe tener entre 8 y 50 caracteres."),

	body("phone")
		.isString()
		.isLength({ min: 9, max: 20 }).withMessage("El teléfono debe tener entre 9 y 20 caracteres."),
		
	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to login.
 */
export const login = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to reset the password.
 */
export const resetPassword = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to get the data of a user.
 */
export const getUserData = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to update a user.
 */
export const updateUser = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

/**
 * Validate the endpoint to delete a user.
 */
export const deleteUser = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]