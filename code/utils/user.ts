import UserInterface from "../interfaces/user";
import UserModel from "../models/users";

/**
 * Servicio del usuario.
 * Aquí se realiza toda la comunicación con la base de datos que tiene que ver con los usuarios.
 */
export default class UserService {

	constructor() {

	}

	public async checkEmailAvailable(email: string): Promise<boolean> {

		try {

			let emailTaken: boolean = false;

			const userObject = await UserModel.findOne({ email });

			if (userObject) {
				emailTaken = true;
			}
			
			return emailTaken;

		} catch (error) {

			console.error(error)
			throw new Error("Error checking if email is available");

		}
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

	/**
	 * Comprueba si existe algún usuario con los parámetros de autenticación que se pasan al servidor.
	 * @param userData Los datos del usario
	 * @returns El objeto del usuario si encuentra alguno que coincida
	 */
	public async checkLoginCredentials(userData: UserInterface) {

		try {

			return await UserModel.findOne({ email: userData.email, password: userData.password });

		} catch (error) {

			console.error(error)
			throw new Error("Error looking up user by credentials");

		}
	}

}