import HttpError from "./HttpError";

/**
 * Handles an http error.
 * @param res Res for the query
 * @param httpError The http error
 */
export default function handleHttpError(res: any, httpError: HttpError) {
	res.status(httpError.statusCode).send(httpError.message)
}