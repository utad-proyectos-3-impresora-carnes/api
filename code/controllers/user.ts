import UserInterface from "../interfaces/user";
import UserService from "../utils/user";
import CypherService from "../utils/cypher";
import jwt from "jsonwebtoken";
import { matchedData } from "express-validator";

/**
 * Crea un usuario.
 * 
 * @param req Request
 * @param res Response
 * @returns El objeto de usuario creado.
 */
export async function createUser(req: any, res: any) {

	try {

		const userService: UserService = new UserService();
		const cypherService: CypherService = new CypherService();

		// Extra los datos del cuerpo.
		const { email, password, phone } = matchedData(req);

		// Comprueba si el email está libre
		if (! await userService.checkEmailAvailable(email)) {
			throw new Error("Email is already taken! Choose another please.");
		}

		// Encripta la contraseña
		const hashedPassword: string = await cypherService.encryptString(password);

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserInterface = {
			email: email,
			password: hashedPassword,
			phone: phone
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
export async function login(req: any, res: any) {

	try {

		// Extra los datos del cuerpo.
		const { email, password } = req.body;

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserInterface = {
			email,
			password
		}

		// Comrprueba que los datos de autenticación sean correctos.
		checkAuthData(userData);

		// Genera el token del usuario.
		const { token, user } = await generateUserToken(userData);

		// Devuelve el objeto creado.
		res.status(201).send({ token: token, user: user });

	} catch (error: any) {

		console.error(error);

		return res.status(500).send({
			alert: "The operation to log in failed!",
			description: error.message
		});

	}

}

/**
 * Comprueba que los datos de autenticación del usuario sean correctos.
 * @param userData Los datos del usuario
 */
export async function checkAuthData(userData: UserInterface) {

	// Crea los servicios
	const userService = new UserService();
	const cypherService: CypherService = new CypherService();

	// Obtener el usuario.
	const userAuthData = await userService.getUserAuthData(userData.email);

	// Comprueba que el usuario existiese en el sistema.
	if (!userAuthData) {
		throw new Error("No existe un usuario con este email!")
	}

	// Comprueba que la contraseña sea correcta.
	const passwordMatch: boolean = await cypherService.checkIfStringMatchesHash(userData.password, userAuthData.password);

	if (!passwordMatch) {
		throw new Error("La contraseña no es correcta!")
	}

}

/**
 * Generate user token
 */
export async function generateUserToken(userData: UserInterface) {

	// Crea los servicios
	const userService = new UserService();

	const userObject = await userService.getUserByEmail(userData.email);

	// TODO: generate token
	const token = jwt.sign({ userId: userObject._id }, process.env.TOKEN_KEY_CONTENTS, {
		expiresIn: process.env.TOKEN_KEY_DURATION,
	});

	return { user: userObject, token: token };

}

/**
 * Solicitar cambio de contraseña.
 * 
 * @param req Request
 * @param res Response
 * @returns Confirmación de que el email se ha enviado o mensaje de que el envio ha fallado.
 */
export async function resetPassword(req: any, res: any) {

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
export async function getUserData(req: any, res: any) {

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
export async function updateUser(req: any, res: any) {

	try {

		// Crea los servicio
		const userService = new UserService();
		const cypherService: CypherService = new CypherService();

		// Extrae los datos de la query
		const userId: string = req.query.id;
		const { email, password, phone } = req.body;

		// Si hay nuevo email, comprueba que esté disponible.
		if (email !== undefined && ! await userService.checkEmailAvailable(email)) {
			throw new Error("Email is already taken! Choose another please.");
		}

		// Si hay nueva contraseña se hashea, sino, se deja en unedfined.
		const hashedPassword: string = password !== undefined ?
			await cypherService.encryptString(password) :
			password;

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserInterface = {
			email: email,
			password: hashedPassword,
			phone: phone
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
export async function deleteUser(req: any, res: any) {

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

