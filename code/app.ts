import createServer from './config/server';
import { config } from 'dotenv';
import morganBody from 'morgan-body';
import { loggerStream } from './utils/handleLogger';

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
const server = createServer();

/**
 * Inicia el servidor, escuchando en el puerto 'port'. Además una vez iniciado ejecuta la función anónima que se declare.
 */
server.listen(port, () => {
	console.log(`Server listening on: http://${url}:${port}`)
});

morganBody(server, {
	noColors: true,
	skip: function (req, res) {
		return res.statusCode < 400;
	},
	stream: loggerStream()
})