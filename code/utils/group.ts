import GroupInterface from "../interfaces/group";
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
	public async getAllGroups(): Promise<Array<GroupInterface>> {

		try {

			return await GroupModel.find<GroupInterface>();

		} catch (error) {

			console.error(error)
			throw new Error("Error checking fetching all groups available");

		}
	}

	/**
	 * Creates a group.
	 * @param groupData The data of the group to create.
	 */
	public async createGroup(groupData: GroupInterface): Promise<any> {

		try {

			return await GroupModel.create<GroupInterface>({
				name: groupData.name,
				type: groupData.type,
				creationYear: groupData.creationYear
			});

		} catch (error: any) {

			console.error(error)
			throw new Error("Error checking creating a group.");

		}

	}

	/**
	 * Obtiene un grupo basado en su nombre.
	 * @param groupName Nombre del grupo que se busca.
	 * @returns El grupo con ese nombre.
	 */
	public async getGroupByName(groupName: string): Promise<GroupInterface> {

		try {

			return await GroupModel.findOne<GroupInterface>({ name: groupName });

		} catch (error) {

			console.error(error)
			throw new Error("Error checking fetching group by name.");

		}

	}

	/**
	 * Obtiene una lista de grupos filtrados.
	 * @param groupFilters Filtros de los grupos
	 * @returns Grupos que cumplen los filtros.
	 */
	public async getFilteredGroups(groupFilters: GroupInterface): Promise<Array<GroupInterface>> {

		try {

			return await GroupModel.find<GroupInterface>(groupFilters);

		} catch (error) {

			console.error(error)
			throw new Error("Error getting filtered groups.");

		}
	}
}