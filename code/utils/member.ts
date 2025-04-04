import { MemberInterface, MemberMongoObjectInterface } from "../interfaces/member";
import MemberModel from "../models/noSql/members";
import handleLocalError from "../errors/handleLocalError";
import { ValidationStates } from "../constants/validationStates";
import { TempMember } from "../models/sql/tempMember";
import fs from "fs";

/**
 * Servicio de los mimebros.
 * Aquí se realiza toda la comunicación con la base de datos que tiene que ver con los miembros.
 */
export default class MemberService {

	constructor() {

	}

	/**
	 * Obtiene todos los miembros presentes en la base de datos.
	 * @returns Todos los miembros presentes en al base de datos.
	 */
	public async getAllMembers(): Promise<Array<MemberMongoObjectInterface>> {

		try {

			return await MemberModel.find<MemberMongoObjectInterface>();

		} catch (error) {

			handleLocalError(error);
			throw new Error("Error checking fetching all members data available");

		}
	}

	/**
	 * Obtiene una lista de miembros filtrados.
	 * @param filter El objeto con los parámetros de filtrado.
	 * @returns Lista con los miembros que cumplen las condiciones de filtrado..
	 */
	public async getFilteredMembers(filter: MemberInterface): Promise<Array<MemberMongoObjectInterface>> {

		try {

			// TODO: Dani
			return await MemberModel.find<MemberMongoObjectInterface>(filter).populate("group");

		} catch (error: any) {

			handleLocalError(error);
			throw new Error("Error getting filteres members");

		}

	}

	/**
	 * Encuentra un miembro en la base de datos basado en su id.
	 * @param memberId El id del miembro
	 * @returns El objeto del miembro cuya id se buscó
	 */
	public async getMemberById(memberId: string): Promise<MemberInterface> {
		try {

			return await MemberModel.findById<MemberInterface>(memberId).populate("group");

		} catch (error) {

			handleLocalError(error);
			throw new Error("Error fetching member by id.");

		}
	}

	/**
	 * Check wether the member with this id exists on the database.
	 * @param memberId The id of the group.
	 */
	public async checkGroupExists(memberId: string): Promise<boolean> {
		try {

			return this.getMemberById(memberId) !== null;

		} catch (error: any) {

			handleLocalError(error);
			throw new Error("Error checking if member exists.");

		}
	}

	/**
	 * Crea un miembro.
	 * @param memberData Los datos de un miembro.
	 * @returns El objeto de miembro creado.
	 */
	public async createMember(memberData: MemberInterface): Promise<MemberMongoObjectInterface> {

		try {

			const member = await MemberModel.create({
				...memberData
			});

			return this.getMemberById(member._id.toString());

		} catch (error: any) {

			handleLocalError(error);
			throw new Error("Error creating a new member.");

		}

	}

	/**
	 * Updates the validation state of a member.
	 * @param memberId The id of the member
	 * @param validationState The validaiton state of the member.
	 * @returns The object with the validaiton state updated.
	 */
	public async updateValidationState(memberId: string, validationState: ValidationStates): Promise<MemberMongoObjectInterface> {

		try {

			await MemberModel.findByIdAndUpdate(memberId, { validationState: validationState });

			return await this.getMemberById(memberId);

		} catch (error: any) {

			handleLocalError(error);
			throw new Error("Error updating validation state.");

		}
	}

	/**
	 * Uopdates the lastCardPrinted value of the member.
	 * @param memberId The id of the member.
	 * @returns The memebr with the printed date updated.
	 */
	public async updatePrintedDate(memberId: string): Promise<MemberMongoObjectInterface> {

		try {

			await MemberModel.findByIdAndUpdate(memberId, { lastCardPrintedDate: Date.now() });

			return await this.getMemberById(memberId);

		} catch (error: any) {

			handleLocalError(error);
			throw new Error("Error updating validation state.");

		}
	}

	/**
	 * Adds a set of members to the mysql table to print them.
	 * @param memberIds The ids of the members.
	 * @returns The member objects updated.
	 */
	public async addMembersToMysqlTable(memberIds: string[]): Promise<MemberMongoObjectInterface[]> {

		try {

			// Cleans table of previous membres
			await TempMember.destroy({});

			const memberArray: Array<MemberMongoObjectInterface> = new Array<MemberMongoObjectInterface>();

			for (const id of memberIds) {

				const member: MemberMongoObjectInterface = await this.getMemberById(id);

				// Add member to table
				await TempMember.create({
					fullName: member.fullName,
					dni: member.dni,
					group: member.group.name,
					// TODO: handle this in case the storage for images change
					profileImage: fs.readFileSync(member.profileImageLink)
				})

				memberArray.push(await this.updatePrintedDate(id));

			}

			return memberArray;

		} catch (error: any) {

			handleLocalError(error);
			throw new Error("Error adding members to mysql table");

		}
	}
}