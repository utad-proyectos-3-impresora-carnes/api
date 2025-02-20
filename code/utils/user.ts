import UserInterface from "../interfaces/user";
import UserModel from "../models/users";

/**
 * Servicio del usuario.
 * Aquí se realiza toda la comunicación con la base de datos que tiene que ver con los usuarios.
 */
export default class UserService {

	constructor() {

	}

	public createUser(userData: UserInterface) {

		try {

			return UserModel.create(userData);

		} catch (error) {

			console.error(error)
			throw new Error("Error adding user to the database");

		}


	}

}