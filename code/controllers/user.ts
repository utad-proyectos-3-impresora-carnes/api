import { UserBasicDataInterface, UseFullDataInterface, UserMongoObjectInterface } from "../interfaces/user";
import UserService from "../utils/user";
import CypherService from "../utils/cypher";
import JsonWebTokenService from "../utils/jsonWebToken";
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

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UseFullDataInterface = {
			...matchedData(req)
		}

		// TODO: revisar esto cuando se vean errores
		// Comprueba si el email está libre
		if (! await userService.checkEmailAvailable(userData.email)) {
			throw new Error("Email is already taken! Choose another please.");
		}

		// Encripta la contraseña
		const hashedPassword: string = await cypherService.encryptString(userData.password);
		userData.password = hashedPassword;

		// Crea el objeto.
		const userObject: UserMongoObjectInterface = await userService.createUser(userData);

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

		// Crea los servicios
		const jsonWebTokenService: JsonWebTokenService = new JsonWebTokenService();

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserBasicDataInterface = {
			...matchedData(req)
		}

		// Comrprueba que los datos de autenticación sean correctos.
		const userFullData: UserMongoObjectInterface = await checkAuthData(userData);

		// Genera el token del usuario.
		const token: string = jsonWebTokenService.generateToken({ userId: userFullData._id });

		// Devuelve el objeto creado.
		res.status(201).send({ token: token, user: userFullData });

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
 * @return El usuario con todos sus datos su la autenticación es correcta.
 */
async function checkAuthData(userData: UserBasicDataInterface): Promise<UserMongoObjectInterface> {

	// Crea los servicios
	const userService: UserService = new UserService();
	const cypherService: CypherService = new CypherService();

	// Obtener el usuario.
	const userAuthData: UserMongoObjectInterface = await userService.getUserAuthData(userData.email);

	// Comprueba que el usuario existiese en el sistema.
	if (!userAuthData) {
		throw new Error("No existe un usuario con este email!")
	}

	// Comprueba que la contraseña sea correcta.
	const passwordMatch: boolean = await cypherService.checkIfStringMatchesHash(userData.password, userAuthData.password);

	if (!passwordMatch) {
		throw new Error("La contraseña no es correcta!")
	}

	return await userService.getUserById(userAuthData._id.toString());

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

		const { email } = matchedData(req);

		// No tocar durante sprint 2
		res.status(501).send(`Has intentado recuperar la contraseña del usuario con el email ${email}.\nEsta funcionalidad no está implementada todavía.`);

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

		// Crea los servicios
		const userService: UserService = new UserService();

		// Extrae los datos de la query
		const { userId } = matchedData(req);

		// Busca el usuario
		const userObject = await userService.getUserById(userId);

		let data: UserMongoObjectInterface | null = userObject;
		let status: number = 200;

		// Comprueba que el usuario exista, sino, cambia los datos que se envían.
		if (!userObject) {
			data = null;
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
 * Obtener todos los datos de un usuario.
 * 
 * @param req Request
 * @param res Response
 * @returns El objeto con todos los datos de un usuario.
 */
export async function getUserByToken(req: any, res: any) {

	try {

		// Devuelve el usuario.
		res.status(200).send(req.user);

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

		const { userId } = matchedData(req);

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UseFullDataInterface = {
			...matchedData(req)
		}

		// Si hay nuevo email, comprueba que esté disponible.
		if (userData.email !== undefined && userData.email !== req.user.email && ! await userService.checkEmailAvailable(userData.email)) {
			throw new Error("Email is already taken! Choose another please.");
		}

		// Si hay nueva contraseña se hashea, sino, se deja en unedfined.
		const hashedPassword: string = userData.password !== undefined ?
			await cypherService.encryptString(userData.password) :
			userData.password;

		userData.password = hashedPassword;

		// Actualiza el usuario.
		const userObject: UserMongoObjectInterface = await userService.updateUserById(userId, userData);

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
		const { userId } = matchedData(req);

		// Busca el usuario
		const userObject: UserMongoObjectInterface = await new UserService().deleteUserById(userId);

		// Devuelve el usuario.
		res.status(200).send(userObject);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to get a user's data failed!");

	}

}

