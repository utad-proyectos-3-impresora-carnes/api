import UserInterface from "../interfaces/user";
import UserModel from "../models/users";

/**
 * Servicio del usuario.
 * Aquí se realiza toda la comunicación con la base de datos que tiene que ver con los usuarios.
 */
export default class UserService {

	constructor() {

	}

	/**
	 * Crea un usuario en la base de datos.
	 * @param userData Datos del usuario que se quiere crear.
	 * @returns El objeto del usaurio creado en la base de datos.
	 */
	public async createUser(userData: UserInterface) {

		try {

			return await UserModel.create(userData);

		} catch (error) {

			console.error(error)
			throw new Error("Error adding user to the database");

		}


	}

}