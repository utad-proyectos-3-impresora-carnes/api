import { GroupTypes } from "../constants/groupTypes";
import MongoDBGenericObjectInterface from "./mongoGenericData";

/**
 * Interfaz de un objeto grupo.
 */
export interface GroupInterface {

	/**
	 * Nombre del grupo
	 */
	name: string,

	/**
	 * Typo del grupo
	 */
	type?: GroupTypes,

	/**
	 * Año de creación del grupo
	 */
	creationYear?: number

}

/**
 * Interfaz de un objeto grupo obtenido de la base de datos.
 */
export interface GroupMongoObjectInterface extends GroupInterface, MongoDBGenericObjectInterface {

}