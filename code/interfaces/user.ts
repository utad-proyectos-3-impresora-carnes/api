import MongoDBGenericObjectInterface from "./mongoGenericData";

/**
 * Interfaz de un objeto usuario.
 */
export interface UserBasicDataInterface {

	/**
	 * El email
	 */
	email: string,

	/**
	 * La contraseña del usuario.
	 */
	password?: string,

}

export interface UseFullDataInterface extends UserBasicDataInterface {

	/**
	 * El teléfono del usuario.
	 */
	phone?: string,

	/**
	 * El nombre del usuario.
	 */
	name?: string,

}

/**
 * Interfaz de un objeto de usuario obtenido de la base de datos de mongodb.
 */
export interface UserMongoObjectInterface extends UseFullDataInterface, MongoDBGenericObjectInterface {

}
