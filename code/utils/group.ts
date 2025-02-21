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
	public async getAllGroups(): Promise<any> {

		try {

			return await GroupModel.find();

		} catch (error) {

			console.error(error)
			throw new Error("Error checking fetching all groups available");

		}
	}
}