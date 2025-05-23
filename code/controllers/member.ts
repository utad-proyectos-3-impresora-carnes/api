import { MemberInterface, MemberMongoObjectInterface } from "../interfaces/member";
import MemberService from "../utils/member";
import { generatePreviewCard } from "../utils/cardGenerator";
import { matchedData } from "express-validator";
import handleHttpError from "../errors/handleHttpError";
import HttpError from "../errors/HttpError";
import { PaginationInterface } from "../interfaces/pagination";
import { ValidationStates } from "../constants/validationStates";

/**
 * Obtiene los metadatos de los miembros
 * 
 * @param req Request
 * @param res Response
 * @returns Todos los metadatos de los miembros.
 */
export async function getMetadata(req: any, res: any) {

	try {

		const validationStates = Object.values(ValidationStates);

		// Devuelve todos metadatos de los miembros
		res.status(200).send({ validationStates: validationStates });

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to get member metadata!"));

	}

}

/**
 * Obtiene todos los miembros de la plataforma.
 * 
 * @param req Request
 * @param res Response
 * @returns Todos los miembros de la plataforma.
 */
export async function getAllMembers(req: any, res: any) {

	try {

		// Crea el servicio
		const memberService: MemberService = new MemberService();

		// Obiene todos los miembros
		const members: Array<MemberMongoObjectInterface> = await memberService.getAllMembers();

		// Devuelve todos los miembros
		res.status(200).send(members);

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to get all members failed!"));

	}

}

/**
 * Obtiene los miembros que siguen una serie de filtros.
 * 
 * @param req Request
 * @param res Response
 * @returns Miembros que pasan todos los filtros.
 */
export async function getFilteredMembers(req: any, res: any) {

	try {

		// Crea el servicio
		const memberService: MemberService = new MemberService();

		// Extraer parámetros de la query
		const { fullName, dni, group, year, validationState, printed, limit, offset } = matchedData(req);

		// Parsear el booleano
		const boolPrinted = printed == "true" ? true : false;

		// Genera el filtro.
		const filter: MemberInterface = {
			fullName: fullName,
			dni: dni,
			validationState: validationState,

			// Grupo con nombre o undefined si no hay parámetro.
			group: group !== undefined ? {
				name: group
			} : undefined,

			// Año de creación del usuario o undefined si no hay.
			creationYear: year !== undefined ? Number(year) : undefined,

			// Pone una fecha cualquiera, o undefined si no tiene.
			lastCardPrintedDate: boolPrinted ? new Date() : undefined
		}

		// Añade la paginación
		const pagination: PaginationInterface = {
			limit: limit ? limit : 20,
			offset: offset ? offset : 0
		};

		// Obiene los miembros filtrados
		const filteredMembers: Array<MemberMongoObjectInterface> = await memberService.getFilteredMembers(filter, pagination);

		// Devuelve los miembros filtrados
		res.status(200).send(filteredMembers);

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to get filtered members failed!"));

	}

}

/**
 * Obtiene la imagen de previsualización de un carne.
 * 
 * @param req Request
 * @param res Response
 * @returns La imagen de previsualización de un carne.
 */
export async function previewMemberCard(req: any, res: any) {

	try {
		// Crea el servicio
		const memberService = new MemberService();

		// Extrae el parámetro de la query
		const { memberId } = matchedData(req);

		const memberObject: MemberMongoObjectInterface = await memberService.getMemberById(memberId);

		const filePath: string = await generatePreviewCard(memberObject);

		res.status(200).send({ preview: filePath });

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to generate a preview card failed!"));

	}

}

/**
 * Edita el estado de validación del mimebro.
 * 
 * @param req Request
 * @param res Response
 * @returns El nuevo objeto del miembro.
 */
export async function editMemberValidatioStatus(req: any, res: any) {

	try {

		// Crea el servicio
		const memberService = new MemberService();

		// Extrae el parámetro de la query
		const { memberId, validationState } = matchedData(req);

		// Cambia el estado de validación.
		const memberObject: MemberMongoObjectInterface = await memberService.updateValidationState(memberId, validationState);

		// Devuelve los datos.
		res.status(200).send(memberObject);

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to update the validation state failed!"));

	}

}

/**
 * Manda a imprimir un miembro.
 * 
 * @param req Request
 * @param res Response
 * @returns Cornfirmación de que el miembro se mandó a imprimir.
 */
export async function printMembers(req: any, res: any) {

	try {

		// Crea el servicio
		const memberService = new MemberService();

		// Extrae el parámetro de la query
		const { memberIds } = matchedData(req);

		// Manda los miembros seleccionados a la base de datos.
		const members: MemberMongoObjectInterface[] = await memberService.addMembersToMysqlTable(memberIds);

		// No tocar durante sprint 2
		res.status(200).send(members);

	} catch (error: any) {

		handleHttpError(res, new HttpError("The operation to schedule a print failed!"));

	}

}