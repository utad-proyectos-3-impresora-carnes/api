import path from 'path';
import fs from 'fs';
import MemberInterface from '../interfaces/member';
import GroupModel from '../models/groups';
import GroupTypes from '../constants/groupTypes';


async function createGroups(data: any): Promise<void> {

	const groupNames: Array<string> = new Array<string>();

	for (const pokemon in data) {

		const typeString: string = data[pokemon]["Type"];
		const pokemonTypes: Array<string> = typeString.split(",");
		const cleanArray: Array<string> = pokemonTypes.map(pokemonType => pokemonType.trim());
	const pathToDataFile = path.join(__dirname, "pokemonDB_dataset.json");


		cleanArray.forEach(type => {
			groupNames.includes(type) ? undefined : groupNames.push(type);
		})

	}
GroupTypes.
	groupNames.forEach(type => {
GroupModel.create({
name:type,
type:	Math.random
})
	});
}


async function createMembers(data: any) {

	for (const pokemon in data) {

		const memberData: MemberInterface = {

			fullName: pokemon,
			dni: data[pokemon]["HP Min"] + data[pokemon]["Attack Base"],
			profileImageLink: undefined,
			lastCardPrintedDate: undefined
		}

		console.log(memberData);

	}

}

/**
 * Adds dummy data to the database.
 * Only used during development.
 */
export default function addDummyData(req: any, res: any) {

	const pathToDataFile = path.join(__dirname, "pokemonDB_dataset.json");

	try {

		if (!fs.existsSync(pathToDataFile))
			throw new Error("El fichero con los datos no existe.");

		const data = JSON.parse(fs.readFileSync(pathToDataFile, { encoding: "utf-8" }));

		createGroups(data);

		// createMembers(data);

		return res.status(201).send("Se han creado los datos de prueba");

	} catch (error: any) {

		console.error(error);

		return res.status(500).send("The operation to fill the database failed!");

	}
}