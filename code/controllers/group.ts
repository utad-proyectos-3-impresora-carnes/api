import handleHttpError from "../errors/handleHttpError";
import HttpError from "../errors/HttpError";
import { GroupInterface, GroupMongoObjectInterface } from "../interfaces/group";
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
		const groupService: GroupService = new GroupService();

		// Obiene todos los grupos
		const groups: Array<GroupMongoObjectInterface> = await groupService.getAllGroups();

		// Devuelve todos los miembros
		res.status(200).send(groups);

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to get all groups failed!"));

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

		//TODO: Dani

		// Crea el servicio
		const groupService: GroupService = new GroupService()

		// Compone los filtros
		const groupFilters: GroupInterface = {
			...matchedData(req)
		}

		// Busca los grupos con los filtros
		const matchedGroups: Array<GroupMongoObjectInterface> = await groupService.getFilteredGroups(groupFilters);

		// Devuelve los datos filtrados
		res.status(200).send(matchedGroups);

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to get filtered groups failed!"));

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

		const { groupId } = matchedData(req);

		// No tocar durante sprint 2
		res.status(501).send(`You have requested to print the group with id: ${groupId}.\nThis is not implemented yet!\nCome back later!`);

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to schedule a print failed!"));

	}

}
