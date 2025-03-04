import MemberInterface from "../interfaces/member";
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
	 * @returns Los miembros en un grupo.
	 */
	public async getMembersInGroup(groupId: string): Promise<any> {

		try {

			return await MemberModel.find({ "group.id": groupId })

		} catch (error) {

			console.error(error)
			throw new Error("Error checking getting all members in a group");

		}
	}

	/**
	 * Crea un miembro.
	 * @param memberData Los datos de un miembro.
	 * @returns El objeto de miembro creado.
	 */
	public async createMember(memberData: MemberInterface): Promise<any> {

		try {

			return await MemberModel.create({
				fullName: memberData.fullName,
				dni: memberData.dni,
				group: memberData.group,
				profileImageLink: memberData.profileImageLink
			});

		} catch (error: any) {

			console.error(error)
			throw new Error("Error creating a new member.");

		}

	}

	/**
	 * Encuentra un miembro en la base de datos basado en su id.
	 * @param memberId El id del miembro
	 * @returns El objeto del miembro cuya id se buscó
	 */
	public async getMemberById(memberId: string): Promise<any> {
		try {

			return await MemberModel.findById(memberId).populate("group");

		} catch (error) {

			console.error(error)
			throw new Error("Error fetching member by id.");

		}
	}

	/**
	 * Obtiene una lista de miembros filtrados.
	 * @param filter El objeto con los parámetros de filtrado.
	 * @returns Lista con los miembros que cumplen las condiciones de filtrado..
	 */
	public async getFilteredMembers(filter: MemberInterface): Promise<any> {

		try {

			return await MemberModel.find(filter);

		} catch (error: any) {

			console.error(error)
			throw new Error("Error getting filteres members");

		}

	}

}