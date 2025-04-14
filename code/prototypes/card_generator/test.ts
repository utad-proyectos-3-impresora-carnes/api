import sharp from 'sharp';
import bwipjs from 'bwip-js';
import axios from 'axios';
import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

// async function cargarImagen(fotoPath: string): Promise<Buffer> {
//     if (fotoPath.startsWith("http")) {
//         try {
//             const response = await axios({ url: fotoPath, responseType: 'arraybuffer' });
//             return response.data;
//         } catch (error) {
//             throw new Error("No se pudo descargar la imagen desde la URL.");
//         }
//     } else {
//         return fs.readFileSync(fotoPath);
//     }
// }

// async function generarCodigoBarras(dni: string): Promise<Buffer> {
//     return new Promise((resolve, reject) => {
//         bwipjs.toBuffer({
//             bcid: 'code128',
//             text: dni,
//             scale: 3,
//             height: 67,
//             includetext: false,
//         }, (err, png) => {
//             if (err) reject(err);
//             else resolve(png);
//         });
//     });
// }

// async function generarTarjeta(nombre: string, grado: string, dni: string, fotoPath: string) {
//     const tarjetaWidth = 1013, tarjetaHeight = 642;
//     const tarjeta = sharp({ create: { width: tarjetaWidth, height: tarjetaHeight, channels: 3, background: 'white' } });
    
//     const fotoBuffer = await cargarImagen(fotoPath);
//     const fotoRedimensionada = await sharp(fotoBuffer).resize(236, 303).toBuffer();
    
//     const barcodeBuffer = await generarCodigoBarras(dni);
//     const barcodeResized = await sharp(barcodeBuffer).resize(420, 53).toBuffer();
    
//     const canvas = createCanvas(tarjetaWidth, tarjetaHeight);
//     const ctx = canvas.getContext('2d');
    
//     ctx.fillStyle = 'black';
//     ctx.font = '30px Arial';
//     ctx.fillText(nombre, 464, 202);
//     ctx.fillText(grado, 464, 302);
    
//     const textBuffer = canvas.toBuffer('image/png');
    
//     const finalImage = await tarjeta
//         .composite([
//             { input: fotoRedimensionada, left: 74, top: 60 },
//             { input: barcodeResized, left: 464, top: 530 },
//             { input: textBuffer, left: 0, top: 0 }
//         ])
//         .toFormat('png')
//         .toBuffer();
    
//     fs.writeFileSync('tarjeta_generada.png', finalImage);
//     console.log("Tarjeta generada con mejor resolución.");
// }

// generarTarjeta(
//     "Rafael Sánchez Fernández",
//     "GRADO INSO",
//     "05942309Y",
//     "https://cdn.discordapp.com/attachments/1334909232117448785/1337048440760176690/Foto.png?ex=67bbc7a5&is=67ba7625&hm=de8a35cee13c8d511a8930727c32fa5a238f68eede6c40c7895db7b7555c915a&"
// );
