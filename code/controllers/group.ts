import GroupService from "../utils/group";

/**
 * Obtiene todos los grupos de la plataforma.
 * 
 * @param req Request
 * @param res Response
 * @returns Todos los grupos de la plataforma.
 */
async function getAllGroups(req: any, res: any) {

	try {

		// Crea el servicio
		const groupService = new GroupService();

		// Obiene todos los grupos
		const groups = await groupService.getAllGroups();

		// Devuelve todos los miembros
		res.status(200).send(groups);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to get all groups failed!");

	}

}

/**
 * Obtiene los grupos que siguen una serie de filtros.
 * 
 * @param req Request
 * @param res Response
 * @returns Grupos que pasan todos los filtros.
 */
async function getFilteredGroups(req: any, res: any) {

	try {

		// No tocar durante sprint 2
		res.status(501).send("Not implemented yet! Come back in sprint 3!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to get filtered groups failed!");

	}

}

/**
 * Manda a imprimir un grupo.
 * 
 * @param req Request
 * @param res Response
 * @returns Cornfirmación de que el grupo se mandó a imprimir.
 */
async function printGroup(req: any, res: any) {

	try {

		// No tocar durante sprint 2
		res.status(501).send("Not implemented yet! Come back in sprint 3!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to schedule a print failed!");

	}

}

export default {
	getAllGroups,
	getFilteredGroups,
	printGroup
};
