import { MemberInterface, MemberMongoObjectInterface } from "../interfaces/member";
import MemberService from "../utils/member";
import generarTarjeta from "../utils/cardGenerator";
import { matchedData } from "express-validator";

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

		console.error(error);

		return res.status(500).send("The operation to get all members failed!");

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

		//TODO: Dani

		// Crea el servicio
		const memberService: MemberService = new MemberService();

		// Genera el filtro.
		const filter: MemberInterface = {
			...matchedData(req)
		}
		// Obiene los miembros filtrados
		const filteredMembers: Array<MemberMongoObjectInterface> = await memberService.getFilteredMembers(filter);

		// Devuelve los miembros filtrados
		res.status(501).send(filteredMembers);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to get filtered members failed!");

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

		const filePath: string = await generarTarjeta(memberObject);

		res.status(200).sendFile(filePath);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to generate a preview card failed!");

	}

}

/**
 * Manda a imprimir un miembro.
 * 
 * @param req Request
 * @param res Response
 * @returns Cornfirmación de que el miembro se mandó a imprimir.
 */
export async function printMember(req: any, res: any) {

	try {

		// Extrae el parámetro de la query
		const { memberId } = matchedData(req);

		// No tocar durante sprint 2
		res.status(501).send(`Has intentado imprimir un miembro con el id ${memberId}.\nEsta funcionalidad no está implementada todavía.`);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to schedule a print failed!");

	}

}