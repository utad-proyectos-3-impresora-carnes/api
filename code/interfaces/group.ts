import { GroupTypes } from "../constants/groupTypes";
import MongoDBGenericObjectInterface from "./mongoGenericData";

/**
 * Interfaz de un objeto grupo.
 */
export interface GroupInterface extends MongoDBGenericObjectInterface {

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