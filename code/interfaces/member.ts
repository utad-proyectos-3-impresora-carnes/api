import { GroupInterface } from "./group";
import MongoDBGenericObjectInterface from "./mongoGenericData";

/**
 * Interfaz de un objeto miembro.
 */
export interface MemberInterface extends MongoDBGenericObjectInterface {

	/**
	 * El nombre completo
	 */
	fullName: string,

	/**
	 * El DNI del miembro.
	 */
	dni: string,

	/**
	 * El grupo del miembro.
	 */
	group?: GroupInterface,

	/**
	 * El link a la imagen de perfil.
	 */
	profileImageLink: string,

	/**
	 * Fecha de la primera impresión del carné
	 */
	lastCardPrintedDate: Date
}