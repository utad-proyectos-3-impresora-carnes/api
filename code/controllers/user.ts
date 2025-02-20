import ExampleService from "../utils/example";

/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
async function createUser(req: any, res: any) {

	try {


	} catch (error: any) {

		console.error(error);

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send("The example GET controller failed!");

	}

}

/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
async function login(req: any, res: any) {

	try {


	} catch (error: any) {

		console.error(error);

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send("The example GET controller failed!");

	}

}
/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
async function resetPassword(req: any, res: any) {

	try {


	} catch (error: any) {

		console.error(error);

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send("The example GET controller failed!");

	}

}
/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
async function getUserData(req: any, res: any) {

	try {


	} catch (error: any) {

		console.error(error);

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send("The example GET controller failed!");

	}

}
/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
async function updateUser(req: any, res: any) {

	try {


	} catch (error: any) {

		console.error(error);

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send("The example GET controller failed!");

	}

}
/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
async function deleteUser(req: any, res: any) {

	try {


	} catch (error: any) {

		console.error(error);

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send("The example GET controller failed!");

	}

}
/**
 * Añadir aquí abajo los controladores para que se exporten bien!
 * Se puede poner un export al principio de la función del controlador 'export function nombreFuncion' pero entonces no te autocompletará en el router con el objeto controldor.
 */
export default {
	createUser,
	login,
	resetPassword,
	getUserData,
	updateUser,
	deleteUser
};
