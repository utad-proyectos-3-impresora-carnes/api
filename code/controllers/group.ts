import GroupInterface from "../interfaces/group";
import GroupService from "../utils/group";
import { matchedData } from "express-validator";

/**
 * Obtiene todos los grupos de la plataforma.
 * 
 * @param req Request
 * @param res Response
 * @returns Todos los grupos de la plataforma.
 */
export async function getAllGroups(req: any, res: any) {

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
export async function getFilteredGroups(req: any, res: any) {

	try {

		// Crea el servicio
		const groupService:GroupService = new GroupService()

		// Compone los filtros
		const groupFilters: GroupInterface = {
			...matchedData(req)
		}
		
		// Busca los grupos con los filtros
		const matchedGroups = groupService.getFilteredGroups(groupFilters);

		// Devuelve los datos filtrados
		res.status(200).send(matchedGroups);

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
 * @returns Confirmación de que el grupo se mandó a imprimir.
 */
export async function printGroup(req: any, res: any) {

	try {

		// No tocar durante sprint 2
		res.status(501).send("Not implemented yet! Come back in sprint 3!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to schedule a print failed!");

	}

}
