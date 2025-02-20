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
	 * Comprueba si ya existe algún usuario con el email que se pase.
	 * @param email Email a verificar
	 * @returns Si está libre
	 */
	public async checkEmailAvailable(email: string): Promise<boolean> {

		try {

			let emailAvailable: boolean = true;

			const userObject = await UserModel.findOne({ email });

			if (userObject) {
				emailAvailable = false;
			}

			return emailAvailable;

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

	/**
	 * Get an user object from the database by ID.
	 * @param userId Id of the user
	 * @returns The object of the user
	 */
	public async getUserById(userId: string) {

		try {

			return await UserModel.findById(userId);

		} catch (error) {

			console.error(error)
			throw new Error("Error looking up user by id");

		}
	}

	/**
	 * Updates the user with a given id, changing the given data.
	 * @param userId The Id of the user to update
	 * @param userData The data to update
	 * @returns The updated object of the user
	 */
	public async updateUserById(userId: string, userData: UserInterface) {

		try {

			await UserModel.updateOne({ _id: userId }, userData);

			return this.getUserById(userId);

		} catch (error) {

			console.error(error)
			throw new Error("Error looking up user by id");

		}
	}


	/**
	 * Deletes a user with the given ID.
	 * @param userId User Id
	 * @returns The 
	 */
	public async deleteUserById(userId: string) {

		try {

			return await UserModel.findByIdAndDelete(userId);

		} catch (error) {

			console.error(error)
			throw new Error("Error deleting user by id");

		}
	}

}