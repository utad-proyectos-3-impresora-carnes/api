import createServer from './config/server';
import { config } from 'dotenv';
import { Express } from 'express';

/**
 * Inicializa las variables de entorno.
 */
config();

/**
 * Declara el puerto en el que se ejecutará el servidor.
 */
const port = process.env.PORT || 3000;
const url = process.env.URL || "localhost";

/**
 * Crea el servidor.
 */
const server: Express = createServer();

/**
 * Inicia el servidor, escuchando en el puerto 'port'. Además una vez iniciado ejecuta la función anónima que se declare.
 */
if (process.env.NODE_ENV !== "test")
	server.listen(port, () => {
		console.log(`Server listening on: http://${url}:${port}`)
	});

export { server };