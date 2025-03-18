/**
 * Externa imports.
 */
import sharp from 'sharp';
import bwipjs from 'bwip-js';
import axios from 'axios';
import fs from 'fs';
import { createCanvas } from 'canvas';
import path from 'path';

/**
 * Local imports
 */
import { MemberInterface } from '../interfaces/member';
import { CardBackgrounds } from '../constants/cardBackgrounds';

const pathToGeneratedImages: string = path.join(__dirname, "..", "assets", "images", "generated");

/**
 * Genera una tarjera para previsualización (fondo azul).
 * @param memberData The data of the member whose card will be generated.
 * @returns The path to the file with the member card
 */
export async function generatePreviewCard(memberData: MemberInterface): Promise<string> {
	try {

		verifyGenratedImageDirExists();

		const generatedImagePath = path.join(pathToGeneratedImages, `carne_${memberData.dni}.png`);

		await generateGenericCard(memberData, generatedImagePath, CardBackgrounds.PREVIEW);

		return generatedImagePath;

	} catch (error) {

		console.error(error);
		throw error;

	}
}

/**
 * Genera una tarjera para impresión (sin fondo).
 * @param memberData The data of the member whose card will be generated.
 * @returns The path to the file with the member card
 */
export async function generatePrintableCard(memberData: MemberInterface): Promise<string> {
	try {

		verifyGenratedImageDirExists();

		const generatedImagePath = path.join(pathToGeneratedImages, `carne_${memberData.dni}.png`);

		await generateGenericCard(memberData, generatedImagePath);

		return generatedImagePath;

	} catch (error) {

		console.error(error);
		throw error;

	}
}

/**
 * Comprueba que el directorio en el que se quiere generar la imagen existe.
 */
function verifyGenratedImageDirExists() {
	if (!fs.existsSync(pathToGeneratedImages)) {
		fs.mkdirSync(pathToGeneratedImages, { recursive: true });
	}
}

/**
 * Genra una imagen png con el formato de carné del mimebro pasado por parámetro.
 * @param memberData Los datos del miembro.
 * @param filePath El path del fichero generado.
 * @param cardBackground El fondo del carné.
 * @returns Nada
 */
async function generateGenericCard(memberData: MemberInterface, filePath: string, cardBackground?: CardBackgrounds): Promise<void> {

	const cardHeight = 642;
	const cardWidth = 1013;

	const background: string = cardBackground ? cardBackground : "white";

	const cardInstance = sharp({
		create: {
			height: cardHeight,
			width: cardWidth,
			channels: 4,
			background: background
		}
	});

	// Generate a buffer with the member photo.
	const fotoBuffer: Buffer = await cargarImagen(memberData.profileImageLink);
	const fotoRedimensionada: Buffer = await sharp(fotoBuffer).resize(236, 303).toBuffer();

	// Generate a buffer with the member dni barcode.
	const barcodeBuffer: Buffer = await generarCodigoBarras(memberData.dni);
	const barcodeResized: Buffer = await sharp(barcodeBuffer).resize(420, 53).toBuffer();

	// Generate a buffer with the text of the image.
	const textBuffer: Buffer<ArrayBufferLike> = addText(memberData, cardWidth, cardHeight);

	// Compose all the buffers in a single image.
	const finalImage = await cardInstance
		.composite([
			{ input: fotoRedimensionada, left: 74, top: 60 },
			{ input: barcodeResized, left: 464, top: 530 },
			{ input: textBuffer, left: 0, top: 0 }
		])
		.toFormat('png')
		.toBuffer();

	// Write the image to disk.
	fs.writeFileSync(filePath, finalImage);

}

/**
 * Genera una imagen con el texto necesario de la tarjeta.
 * @param memberData Datos del miembro cuyo texto de va a coger.
 * @param cardWidth El ancho de la tarjeta
 * @param cardHeight El alto de la tarjeta
 * @returns Un buffer de imagen png con el texto que se debe añadir.
 */
function addText(memberData: MemberInterface, cardWidth: number, cardHeight: number): Buffer<ArrayBufferLike> {

	const canvas = createCanvas(cardWidth, cardHeight);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = 'black';
	ctx.font = '30px Arial';
	ctx.fillText(memberData.fullName, 464, 202);
	ctx.fillText(memberData?.group?.name, 464, 302);

	return canvas.toBuffer('image/png');

}

/**
 * Descarga la foto del miembro y la pasa a buffer.
 * @param fotoPath El link a la foto del mimebro.
 * @returns Un buffer con la foto del miembro.
 */
async function cargarImagen(fotoPath: string): Promise<Buffer> {
	try {
		const response = await axios({ url: fotoPath, responseType: 'arraybuffer' });
		console.log("axios", response.data)

		const respAlt = await fetch(fotoPath);
		console.log("fetc", respAlt)
		return response.data;
	} catch (error) {
		throw new Error("No se pudo descargar la imagen desde la URL.");
	}
}

/**
 * Generates a buffer of the image of a barcode with the dni encoded.
 * @param dni The DNI to encode.
 * @returns The buffer with an image of a barcode encoding the dni.
 */
async function generarCodigoBarras(dni: string): Promise<Buffer> {
	return await bwipjs.toBuffer({
		bcid: 'code128',
		text: dni,
		scale: 3,
		height: 67,
		includetext: false,
	})
}
