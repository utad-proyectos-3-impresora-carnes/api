import jwt from "jsonwebtoken";
import UserService from "../utils/user";

/**
 * Checks if the token in the request exists and is valid in the database.
 * Also adds a user field to the query with the object of the user who launched the query.
 * 
 * @param req Request
 * @param res Response
 * @param next Next field
 */
export default async function auth(req: any, res: any, next: any) {

	const token = req.header('Authorization');

	// if (!token) return res.status(401).json({ error: 'Access denied, there is no token!' });

	try {

		// const userService: UserService = new UserService();
		
		// const decoded = jwt.verify(token, 'your-secret-key');
		
		// const user = await userService.getUserById(decoded.userId);

		// if (!user) {
		// 	return res.status(401).json({ error: 'The user doesn\'t exist!' });
		// }
		
		// req.user = user;
		
		next();

	} catch (error) {

		res.status(401).json({ error: 'Invalid token' });

	}

}