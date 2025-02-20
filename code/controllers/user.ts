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

		res.send("Not implemented yet!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to create a user failed!");

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

		res.send("Not implemented yet!");

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

		res.send("Not implemented yet!");

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

		res.send("Not implemented yet!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to get a user's data failed!");

	}

}

/**
 * Cambia los datos de usuario que se envién el petición.
 * 
 * @param req Request
 * @param res Response
 * @returns El objeto de usuario con sus valores actualizados.
 */
async function updateUser(req: any, res: any) {

	try {

		res.send("Not implemented yet!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to update a user failed!");

	}


}

/**
 * Borra el usuario que realizó esta petición
 * 
 * @param req Request
 * @param res Response
 * @returns Confirmación de que se ha borrado la cuenta del usuario o un error en caso contrario.
 */
async function deleteUser(req: any, res: any) {

	try {

		res.send("Not implemented yet!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to delete a user failed!");

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
