import express from "express";
import { Express } from "express";
import router from "./routes";
import cors from 'cors';
import { mongooseConnect } from "./mongo";
import { MySqlConnection } from "./mysql";
import { sendLogs } from "../utils/handleLogger";
import { TempMember } from "../models/sql/tempMember";

/**
 * Crea el servidor con toda la configuración necesaria.
 * @returns Un objeto de servidor.
 */
export default function createServer(): Express {

	const server = express();

	// Control de accesos al servidor, aquí irian listas de IPs o dominions, por ahora en blanco.
	server.use(cors());

	// Permite tratar los cuerpos de las requests como si fueran jsons.
	server.use(express.json());

	// Añadir los ficheros estáticos
	server.use("/assets", express.static('assets'));

	// Manda los logs a slack.
	sendLogs(server);

	// Añade el objeto router que el servidor usará.
	server.use(router);

	// Conectar a la base de datos
	mongooseConnect();
	mysqlSync();

	return server;
}

function mysqlSync() {
	const mySqlConnection: MySqlConnection = MySqlConnection.getInstance();
	mySqlConnection.checkDatabaseExists().then(() => {
		mySqlConnection.initializeConnection();
		TempMember.sync();
	})
}