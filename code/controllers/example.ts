import ExampleService from "../services/example";

/**
 * Ejemplo de un controlador.
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function exampleGet(req: any, res: any) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		// Crea un nuevo objeto de servicio.
		const exampleService = new ExampleService();

		// Responde a la petición
		return res.status(200).send({
			text: "Thou arth seeing an example GET!",
			fetchedData: exampleService.getUsefulArray()
		});

	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example GET controller failed!",
			error: error
		});

	}

}

/**
 * Ejemplo de un controlador.
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function examplePost(req, res) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		return res.status(200).send("Thou arth seeing an example POST!");

	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example GET controller failed!",
			error: error
		});

	}
}

/**
 * Ejemplo de un controlador.
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function examplePut(req, res) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		return res.status(200).send("Thou arth seeing an example PUT!");

	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example GET controller failed!",
			error: error
		});

	}
}

/**
 * Ejemplo de un controlador.
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function examplePatch(req, res) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		return res.status(200).send("Thou arth seeing an example PATCH!");

	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example GET controller failed!",
			error: error
		});

	}
}

/**
 * Ejemplo de un controlador.
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function exampleDelete(req, res) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		return res.status(200).send("Thou arth seeing an example DELETE!");

	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example GET controller failed!",
			error: error
		});

	}
}

/**
 * Añadir aquí abajo los controladores para que se exporten bien!
 * Se puede poner un export al principio de la función del controlador 'export function nombreFuncion' pero entonces no te autocompletará en el router con el objeto controldor.
 */
export default {
	exampleGet,
	examplePost,
	examplePut,
	examplePatch,
	exampleDelete
};
