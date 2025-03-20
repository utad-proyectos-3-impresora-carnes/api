import { GroupInterface, GroupMongoObjectInterface } from "../interfaces/group";
import GroupModel from "../models/groups";

/**
 * Servicio de los mimebros.
 * Aquí se realiza toda la comunicación con la base de datos que tiene que ver con los miembros.
 */
export default class GroupService {

	constructor() {

	}

	/**
	 * Obtiene todos los grupos presentes en la base de datos.
	 * @returns Todos los grupos presentes en al base de datos.
	 */
	public async getAllGroups(): Promise<Array<GroupMongoObjectInterface>> {

		try {

			return await GroupModel.find<GroupMongoObjectInterface>();

		} catch (error) {

			console.error(error);
			throw new Error("Error checking fetching all groups available");

		}
	}

	/**
	 * Obtiene una lista de grupos filtrados.
	 * @param groupFilters Filtros de los grupos
	 * @returns Grupos que cumplen los filtros.
	 */
	public async getFilteredGroups(groupFilters: GroupInterface): Promise<Array<GroupMongoObjectInterface>> {

		try {

			const processedFilters: any = groupFilters;

			// Quita campos no usados
			Object.keys(processedFilters).forEach(key => processedFilters[key] === undefined && delete processedFilters[key])

			// Cambia el nombre por una expresión regular.
			if (groupFilters.name !== undefined) {
				processedFilters.name = { $regex: '^' + groupFilters.name, $options: 'i' }
			}

			// Ejecuta la query
			return await GroupModel.find<GroupMongoObjectInterface>(processedFilters);

		} catch (error) {

			console.error(error);
			throw new Error("Error getting filtered groups.");

		}
	}

	/**
	 * Obtiene un grupo según su ID
	 * @param groupId Id del grupo
	 */
	public async getGroupById(groupId: string): Promise<GroupMongoObjectInterface> {
		try {

			return GroupModel.findById<GroupMongoObjectInterface>(groupId);

		} catch (error: any) {

			console.error(error);
			throw new Error("Error getting group by id.");

		}
	}

	/**
	 * Check wether the group with this id exists on the database.
	 * @param groupId The id of the group.
	 */
	public async checkGroupExists(groupId: string): Promise<boolean> {
		try {

			return this.getGroupById(groupId) !== null;

		} catch (error: any) {

			console.error(error);
			throw new Error("Error checking if group exists.");

		}
	}

	/**
	 * Creates a group.
	 * @param groupData The data of the group to create.
	 */
	public async createGroup(groupData: GroupInterface): Promise<GroupMongoObjectInterface> {

		try {

			const group = await GroupModel.create({
				name: groupData.name,
				type: groupData.type,
				creationYear: groupData.creationYear
			});

			return await this.getGroupById(group._id.toString());

		} catch (error: any) {

			console.error(error);
			throw new Error("Error checking creating a group.");

		}

	}

	// /**
	//  * Obtiene un grupo basado en su nombre.
	//  * @param groupName Nombre del grupo que se busca.
	//  * @returns El grupo con ese nombre.
	//  */
	// public async getGroupByName(groupName: string): Promise<GroupInterface> {

	// 	try {

	// 		return await GroupModel.findOne<GroupInterface>({ name: groupName });

	// 	} catch (error) {

	// 		console.error(error);
	// 		throw new Error("Error checking fetching group by name.");

	// 	}

	// }

}