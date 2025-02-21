import MemberModel from "../models/members";

/**
 * Servicio de los mimebros.
 * Aquí se realiza toda la comunicación con la base de datos que tiene que ver con los miembros.
 */
export default class MemberService {

	constructor() {

	}

	/**
	 * Obtiene todos los meimbros presentes en la base de datos.
	 * @returns Todos los meimbros presentes en al base de datos.
	 */
	public async getAllMembers(): Promise<any> {

		try {

			return await MemberModel.find();

		} catch (error) {

			console.error(error)
			throw new Error("Error checking fetching all members data available");

		}
	}

	/**
	 * Obtiene todos los miembros cuyo grupo contenga ese id.
	 * @param groupId El id del grupo.
	 */
	public async getMembersInGroup(groupId: string) {

		try {

			return await MemberModel.find({ "group.id" : groupId })

		} catch (error) {

			console.error(error)
			throw new Error("Error checking getting all members in a group");

		}
	}
}