import JsonWebTokenService from "../utils/jsonWebToken";
import UserService from "../utils/user";
import { UserMongoObjectInterface } from "../interfaces/user";

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
		console.log(decoded)
		const userService: UserService = new UserService();

		const user: UserMongoObjectInterface = await userService.getUserById(decoded.userId);

		if (!user) {
			return res.status(401).json({ error: 'The user doesn\'t exist!' });
		}

		req.user = user;

		next();

	} catch (error) {

		console.error(error);
		return res.status(401).json({ error: error.message });

	}

}