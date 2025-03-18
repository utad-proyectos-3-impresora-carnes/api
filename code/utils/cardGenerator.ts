import sharp from 'sharp';
import bwipjs from 'bwip-js';
import axios from 'axios';
import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
import { MemberInterface } from '../interfaces/member';
import path from 'path';
import { CardBackgrounds } from '../constants/cardBackgrounds';

const pathToGeneratedImages: string = path.join(__dirname, "..", "assets", "images", "generated");

function verifyGenratedImageDirExists() {
	if (!fs.existsSync(pathToGeneratedImages)) {
		fs.mkdirSync(pathToGeneratedImages);
	}
}

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

async function generateGenericCard(memberData: MemberInterface, filePath: string, cardBackground?: CardBackgrounds) {
	const tarjetaWidth = 1013, tarjetaHeight = 642;
	const tarjeta = sharp({ create: { width: tarjetaWidth, height: tarjetaHeight, channels: 3, background: 'white' } });

	const fotoBuffer = await cargarImagen(memberData.profileImageLink);
	const fotoRedimensionada = await sharp(fotoBuffer).resize(236, 303).toBuffer();

	const barcodeBuffer = await generarCodigoBarras(memberData.dni);
	const barcodeResized = await sharp(barcodeBuffer).resize(420, 53).toBuffer();

	const canvas = createCanvas(tarjetaWidth, tarjetaHeight);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = 'black';
	ctx.font = '30px Arial';
	ctx.fillText(memberData.fullName, 464, 202);
	ctx.fillText(memberData?.group?.name, 464, 302);

	const textBuffer = canvas.toBuffer('image/png');

	const finalImage = await tarjeta
		.composite([
			{ input: fotoRedimensionada, left: 74, top: 60 },
			{ input: barcodeResized, left: 464, top: 530 },
			{ input: textBuffer, left: 0, top: 0 }
		])
		.toFormat('png')
		.toBuffer();

	// Ensure the 'out' directory exists
	const dirPath = path.dirname(filePath);
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}

	fs.writeFileSync(filePath, finalImage);

	return filePath;
}

async function cargarImagen(fotoPath: string): Promise<Buffer> {
	if (fotoPath.startsWith("http")) {
		try {
			const response = await axios({ url: fotoPath, responseType: 'arraybuffer' });
			return response.data;
		} catch (error) {
			throw new Error("No se pudo descargar la imagen desde la URL.");
		}
	} else {
		return fs.readFileSync(fotoPath);
	}
}

async function generarCodigoBarras(dni: string): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		bwipjs.toBuffer({
			bcid: 'code128',
			text: dni,
			scale: 3,
			height: 67,
			includetext: false,
		}, (err, png) => {
			if (err) reject(err);
			else resolve(png);
		});
	});
}
