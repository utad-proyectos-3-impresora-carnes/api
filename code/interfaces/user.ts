import MongoDBGenericObjectInterface from "./mongoGenericData";

/**
 * Interfaz de un objeto usuario.
 */
export default interface UserInterface extends MongoDBGenericObjectInterface {
		
	/**
	 * El email
	 */
	email: string,
	
	/**
	 * La contraseña del usuario.
	 */
	password: string,

	/**
	 * El teléfono del usuario.
	 */
	phone?: string,
}