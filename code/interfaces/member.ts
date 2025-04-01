import { ValidationStates } from "../constants/validationStates";
import { GroupMongoObjectInterface } from "./group";
import MongoDBGenericObjectInterface from "./mongoGenericData";

/**
 * Interfaz de un objeto miembro.
 */
export interface MemberInterface {

	/**
	 * El nombre completo
	 */
	fullName: string;

	/**
	 * El DNI del miembro.
	 */
	dni: string;

	/**
	 * El grupo del miembro.
	 */
	group?: GroupMongoObjectInterface;

	/**
	 * El link a la imagen de perfil.
	 */
	profileImageLink?: string;

	/**
	 * Fecha de la primera impresión del carné
	 */
	lastCardPrintedDate?: Date;

	/**
	 * Año de creación del miembro
	 */
	creationYear?: number;

	/**
	 * Estado de la validación del miembro
	 */
	validationState?: ValidationStates;

}

/**
 * Interfaz de un objeto de miembro obtenido de la base de datos de mongodb.
 */
export interface MemberMongoObjectInterface extends MemberInterface, MongoDBGenericObjectInterface {

}