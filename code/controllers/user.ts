import { Response } from "express";
import UserInterface from "../interfaces/user";
import UserService from "../utils/user";

/**
 * Crea un usuario.
 * 
 * @param req Request
 * @param res Response
 * @returns El objeto de usuario creado.
 */
async function createUser(req: any, res: any) {

	try {

		const userService: UserService = new UserService();

		// Extra los datos del cuerpo.
		const { email, password, phone } = req.body;

		// Comprueba si el email está libre
		if (! await userService.checkEmailAvailable(email)) {
			throw new Error("Email is already taken! Choose another please.");
		}

		// TODO: cypher password.
		
		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserInterface = {
			email,
			password,
			phone
		}

		// Crea el objeto.
		const userObject = await userService.createUser(userData);

		// Devuelve el objeto creado.
		res.status(201).send(userObject);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send(error.message);

	}

}

/**
 * Realiza el login.
 * 
 * @param req Request
 * @param res Response
 * @returns Token de autenticación para el usuario.
 */
async function login(req: any, res: any) {

	try {

		// Extra los datos del cuerpo.
		const { email, password } = req.body;

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserInterface = {
			email,
			password
		}

		// Crea el objeto.
		const userObject = await new UserService().checkLoginCredentials(userData);

		// TODO: somehow make a token for the user
		console.log(userObject)

		// Devuelve el objeto creado.
		res.status(201).send(userObject);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to log in failed!");

	}

}

/**
 * Solicitar cambio de contraseña.
 * 
 * @param req Request
 * @param res Response
 * @returns Confirmación de que el email se ha enviado o mensaje de que el envio ha fallado.
 */
async function resetPassword(req: any, res: any) {

	try {

		// No tocar durante sprint 2
		res.status(501).send("Not implemented yet! Come back in sprint 3!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to reset password failed!");

	}

}

/**
 * Obtener todos los datos de un usuario.
 * 
 * @param req Request
 * @param res Response
 * @returns El objeto con todos los datos de un usuario.
 */
async function getUserData(req: any, res: any) {

	try {

		// Extrae los datos de la query
		const userId: string = req.query.id;

		// Busca el usuario
		const userObject = await new UserService().getUserById(userId);

		let data: any = userObject;
		let status: number = 200;

		// Comprueba que el usuario exista, sino, cambia los datos que se envían.
		if (!userObject) {
			data = "User not found!";
			status = 404;
		}

		// Devuelve el usuario.
		res.status(status).send(data);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to get a user's data failed!");

	}

}

/**
 * Cambia los datos del usuario que se envié en la petición.
 * 
 * @param req Request
 * @param res Response
 * @returns El objeto de usuario con sus valores actualizados.
 */
async function updateUser(req: any, res: any) {

	try {

		// Crea el servicio
		const userService = new UserService();

		// Extrae los datos de la query
		const userId: string = req.query.id;
		const { email, password, phone } = req.body;

		// Si hay nuevo email, comprueba que esté disponible.
		if (email !== undefined && ! await userService.checkEmailAvailable(email)) {
			throw new Error("Email is already taken! Choose another please.");
		}

		// TODO: if new password cypher it

		const userData: UserInterface = {
			email,
			password,
			phone
		}

		// Actualiza el usuario.
		const userObject = await userService.updateUserById(userId, userData);

		// Devuelve el nuevo usuario.
		res.status(200).send(userObject);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to update a user failed!");

	}


}

/**
 * Borra al usuario que se solicitó en esta perición.
 * 
 * @param req Request
 * @param res Response
 * @returns Confirmación de que se ha borrado la cuenta del usuario o un error en caso contrario.
 */
async function deleteUser(req: any, res: any) {

	try {

		// Extrae los datos de la query
		const userId: string = req.query.id;

		// Busca el usuario
		const userObject = await new UserService().deleteUserById(userId);

		// Devuelve el usuario.
		res.status(200).send(userObject);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to get a user's data failed!");

	}

}

export default {
	createUser,
	login,
	resetPassword,
	getUserData,
	updateUser,
	deleteUser
};
