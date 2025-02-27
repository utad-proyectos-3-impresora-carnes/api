import { validationResult } from "express-validator"

/**
 * Comprueba si ha habido errores de validación.
 * @param req Request
 * @param res response
 * @param next Next
 * @returns Next
 */
export default function validateResults(req: any, res: any, next: any) {
	try {
		validationResult(req).throw()
		return next()
	} catch (err) {
		res.status(422)
		res.send({ errors: err.array() })
	}
}