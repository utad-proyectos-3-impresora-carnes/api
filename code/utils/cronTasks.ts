import fs from "fs";
import path from "node:path";
import handleLocalError from "../errors/handleLocalError";

/**
 * Deletes all the card previews generated.
 * @returns Void
 */
export function deleteCardPreviews(): void {


	try {

		const previewCardsPath: string = path.join(__dirname, "..", "assets", "images", "generated");

		if (!fs.existsSync(previewCardsPath))
			return;

		for (const fileName of fs.readdirSync(previewCardsPath)) {

			fs.unlinkSync(path.join(previewCardsPath, fileName));
		}

	} catch (error: any) {
		handleLocalError(error);
	}
}

/**
 * Updates the database from information upstream.
 */
export function updateDataFromDatabase() {

}