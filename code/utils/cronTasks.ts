import fs from "fs";
import path from "node:path";

export function deleteCardPreviews() {
	console.log("Doing task");

	try {

		const previewCardsPath: string = path.join(__dirname, "..", "assets", "images", "generated");

		console.log(previewCardsPath);

		if (!fs.existsSync(previewCardsPath))
			return;

		for (const fileName of fs.readdirSync(previewCardsPath)) {

			fs.unlinkSync(path.join(previewCardsPath, fileName));
		}

	} catch (error: any) {

	}
}

export function updateDataFromDatabase() {

}