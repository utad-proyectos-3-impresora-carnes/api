import path from 'path';
import fs from 'fs';
import MemberInterface from '../interfaces/member';
import GroupTypes from '../constants/groupTypes';
import { randomInt } from 'crypto';
import GroupInterface from '../interfaces/group';
import GroupService from '../utils/group';
import MemberService from '../utils/member';
import { connection } from 'mongoose';


function getRandomGroupType(): string {
	const values: Array<string> = Object.values(GroupTypes).filter(value => typeof value === "string");
	return values[Math.floor(Math.random() * values.length)];
}

async function createGroups(data: any): Promise<void> {

	const groupNames: Array<string> = new Array<string>();
	const groupService: GroupService = new GroupService();

	for (const pokemon in data) {

		const typeString: string = data[pokemon]["Type"];
		const pokemonTypes: Array<string> = typeString.split(",");
		const cleanArray: Array<string> = pokemonTypes.map(pokemonType => pokemonType.trim());

		cleanArray.forEach(type => {
			groupNames.includes(type) ? undefined : groupNames.push(type);
		});

	}

	groupNames.forEach(type => {

		const groupData: GroupInterface = {

			name: type,
			type: GroupTypes[getRandomGroupType()],
			creationYear: randomInt(20)

		};

		groupService.createGroup(groupData).catch(error => console.error("Error creado tipo ", type));

	});

}


async function createMembers(data: any) {

	const groupService: GroupService = new GroupService();
	const memberService: MemberService = new MemberService();

	for (const pokemon in data) {

		const pathToImage = path.join(__dirname, "images", pokemon, pokemon + ".png");
		const mainType: string = data[pokemon]["Type"].split(",").map(pokemonType => pokemonType.trim())[0];
		const groupObject: any = await groupService.getGroupByName(mainType);

		const memberData: MemberInterface = {

			fullName: pokemon,
			dni: data[pokemon]["HP Min"] + data[pokemon]["Attack Base"],
			profileImageLink: pathToImage,
			group: {
				_id: groupObject._id,
				name: groupObject.name
			},
			lastCardPrintedDate: undefined

		}

		memberService.createMember(memberData);

	}

}

/**
 * Adds dummy data to the database.
 * Only used during development.
 */
export default async function addDummyData(req: any, res: any) {

	await connection.dropDatabase();

	const pathToDataFile = path.join(__dirname, "pokemonDB_dataset.json");

	try {

		if (!fs.existsSync(pathToDataFile))
			throw new Error("El fichero con los datos no existe.");

		const data = JSON.parse(fs.readFileSync(pathToDataFile, { encoding: "utf-8" }));

		createGroups(data);

		createMembers(data);

		return res.status(201).send("Se han creado los datos de prueba");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to fill the database failed!");

	}
}