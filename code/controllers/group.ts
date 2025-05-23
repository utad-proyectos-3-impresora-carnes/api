import { GroupTypes } from "../constants/groupTypes";
import handleHttpError from "../errors/handleHttpError";
import HttpError from "../errors/HttpError";
import { GroupInterface, GroupMongoObjectInterface } from "../interfaces/group";
import { PaginationInterface } from "../interfaces/pagination";
import GroupService from "../utils/group";
import { matchedData } from "express-validator";

/**
 * Obtiene los metadatos de los grupos
 * 
 * @param req Request
 * @param res Response
 * @returns Todos los grupos de la plataforma.
 */
export async function getMetadata(req: any, res: any) {

	try {

		const groupTypes = Object.values(GroupTypes);

		// Devuelve todos los metadatos de los grupos
		res.status(200).send({ groupTypes: groupTypes });

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to get group metadata failed!"));

	}

}

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

		// Devuelve todos los grupos
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

		// Crea el servicio
		const groupService: GroupService = new GroupService()

		// Extrae parámetros de la query
		const { name, type, creationYear, limit, offset } = matchedData(req);

		// Compone los filtros.
		const groupFilters: GroupInterface = {
			name: name,
			type: type,
			creationYear: creationYear !== undefined ? Number(creationYear) : undefined
		};

		// Añade la paginación.
		const pagination: PaginationInterface = {
			limit: limit ? limit : 20,
			offset: offset ? offset : 0
		};

		// Busca los grupos con los filtros
		const matchedGroups: Array<GroupMongoObjectInterface> = await groupService.getFilteredGroups(groupFilters, pagination);

		// Devuelve los datos filtrados
		res.status(200).send(matchedGroups);

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to get filtered groups failed!"));

	}

}