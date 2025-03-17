import { MemberInterface } from "../interfaces/member";
import MemberModel from "../models/members";

/**
 * Servicio de los mimebros.
 * Aquí se realiza toda la comunicación con la base de datos que tiene que ver con los miembros.
 */
export default class MemberService {

	constructor() {

	}

	/**
	 * Obtiene todos los miembros presentes en la base de datos.
	 * @returns Todos los miembros presentes en al base de datos.
	 */
	public async getAllMembers(): Promise<Array<MemberInterface>> {

		try {

			return await MemberModel.find<MemberInterface>();

		} catch (error) {

			console.error(error);
			throw new Error("Error checking fetching all members data available");

		}
	}

	/**
	 * Obtiene una lista de miembros filtrados.
	 * @param filter El objeto con los parámetros de filtrado.
	 * @returns Lista con los miembros que cumplen las condiciones de filtrado..
	 */
	public async getFilteredMembers(filter: MemberInterface): Promise<Array<MemberInterface>> {

		try {

			// TODO: Dani
			return await MemberModel.find<MemberInterface>(filter).populate("group");

		} catch (error: any) {

			console.error(error);
			throw new Error("Error getting filteres members");

		}

	}

	/**
	 * Encuentra un miembro en la base de datos basado en su id.
	 * @param memberId El id del miembro
	 * @returns El objeto del miembro cuya id se buscó
	 */
	public async getMemberById(memberId: string): Promise<MemberInterface> {
		try {

			return await MemberModel.findById<MemberInterface>(memberId).populate("group");

		} catch (error) {

			console.error(error);
			throw new Error("Error fetching member by id.");

		}
	}

	/**
	 * Check wether the member with this id exists on the database.
	 * @param memberId The id of the group.
	 */
	public async checkGroupExists(memberId: string): Promise<boolean> {
		try {

			return this.getMemberById(memberId) !== null;

		} catch (error: any) {

			console.error(error);
			throw new Error("Error checking if member exists.");

		}
	}

	// /**
	//  * Obtiene todos los miembros cuyo grupo contenga ese id.
	//  * @param groupId El id del grupo.
	//  * @returns Los miembros en un grupo.
	//  */
	// public async getMembersInGroup(groupId: string): Promise<any> {

	// 	try {

	// 		return await MemberModel.find({ "group.id": groupId })

	// 	} catch (error) {

	// 		console.error(error);
	// 		throw new Error("Error checking getting all members in a group");

	// 	}
	// }

	/**
	 * Crea un miembro.
	 * @param memberData Los datos de un miembro.
	 * @returns El objeto de miembro creado.
	 */
	public async createMember(memberData: MemberInterface): Promise<any> {

		try {

			const member = await MemberModel.create({
				fullName: memberData.fullName,
				dni: memberData.dni,
				group: memberData.group,
				profileImageLink: memberData.profileImageLink
			});

			return this.getMemberById(member._id.toString());

		} catch (error: any) {

			console.error(error);
			throw new Error("Error creating a new member.");

		}

	}

}