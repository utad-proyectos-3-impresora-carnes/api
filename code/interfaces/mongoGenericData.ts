import { Schema } from "mongoose";

/**
 * Interfaz de un objeto generico de mongodb.
 */
export default interface MongoDBGenericObjectInterface {
	/**
	 * El id del objeto.
	 */
	_id?: Schema.Types.ObjectId,
	
	/**
	 * Fecha en la que el objeto fue creado.
	 */
	createdAt?: string,
	
	/**
	 * Fecha en la que el objeto fue actualizado por última vez.
	 */
	updatedAt?: string

}