import MemberService from "../utils/member";

/**
 * Obtiene todos los miembros de la plataforma.
 * 
 * @param req Request
 * @param res Response
 * @returns Todos los miembros de la plataforma.
 */
async function getAllMembers(req: any, res: any) {

	try {

		// Crea el servicio
		const memberService = new MemberService();

		// Obiene todos los miembros
		const members = await memberService.getAllMembers();

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
async function getFilteredMembers(req: any, res: any) {

	try {

		// No tocar durante sprint 2
		res.status(501).send("Not implemented yet! Come back in sprint 3!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to get filtered members failed!");

	}

}

/**
 * Obtiene los miembros de un grupo.
 * 
 * @param req Request
 * @param res Response
 * @returns Todos los miembros de un grupo
 */
async function getMembersInGroup(req: any, res: any) {

	try {

		// Crea el servicio
		const memberService = new MemberService();

		// Extrae el parámetro de la query
		const groupId = req.query.groupId;

		// Obten los miembros del grupo
		const membersInGroup = await memberService.getMembersInGroup(groupId);

		// Devuelve los miembros del grupo
		res.status(501).send(membersInGroup);

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to fetch all members in a group failed!");

	}

}

/**
 * Obtiene la imagen de previsualización de un carne.
 * 
 * @param req Request
 * @param res Response
 * @returns La imagen de previsualización de un carne.
 */
async function previewMemberCard(req: any, res: any) {

	try {

		// No tocar durante sprint 2
		res.status(501).send("Not implemented yet! Come back in sprint 3!");

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
async function printMember(req: any, res: any) {

	try {

		// No tocar durante sprint 2
		res.status(501).send("Not implemented yet! Come back in sprint 3!");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to schedule a print failed!");

	}

}

export default {
	getAllMembers,
	getFilteredMembers,
	getMembersInGroup,
	previewMemberCard,
	printMember
};
