import JsonWebTokenService from "../utils/jsonWebToken";
import UserService from "../utils/user";
import { UserMongoObjectInterface } from "../interfaces/user";
import handleHttpError from "../errors/handleHttpError";
import HttpError from "../errors/HttpError";

/**
 * Checks if the token in the request exists and is valid in the database.
 * Also adds a user field to the query with the object of the user who launched the query.
 * 
 * @param req Request
 * @param res Response
 * @param next Next field
 */
export default async function auth(req: any, res: any, next: any) {

	try {

		if (!req.header('Authorization')) {
			throw new Error("Se debe enviar un token JWT!");
		}

		const token = req.header('Authorization').split(" ").pop();

		if (!token) {
			throw new Error("No hay token!");
		}

		const jsonWebTokenService: JsonWebTokenService = new JsonWebTokenService();

		const decoded = jsonWebTokenService.verifyToken(token);

		const userService: UserService = new UserService();

		const user: UserMongoObjectInterface = await userService.getUserById(decoded.userId);

		if (!user) {
			throw new Error("El usuario no existe!");
		}

		req.user = user;

		next();

	} catch (error) {

		handleHttpError(res, new HttpError("INVALID_TOKEN", 401));

	}

}