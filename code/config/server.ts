import express from "express";
import { Express } from "express";
import router from "./routes";
import cors from 'cors';
import { mongooseConnect } from "./mongo";
import { MySqlConnection } from "../config/mySql";
import { sendLogs } from "../utils/handleLogger";
import { TempMember } from "../models/sql/tempMember";
import { CronJob } from "cron";
import { deleteCardPreviews, updateDataFromDatabase } from "../utils/cronTasks";
import handleLocalError from "../errors/handleLocalError";

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

	// Schedule cron jobs
	scheduleCronJobs();

	return server;
}

/**
 * Conectarse a mySql
 */
function mysqlSync() {
	try {

		const mySqlConnection: MySqlConnection = MySqlConnection.getInstance();

		mySqlConnection.checkDatabaseExists()
			.then(() => {
				mySqlConnection.initializeConnection();
				TempMember.sync();
			})
			.catch((error: any) => {
				handleLocalError(error)
			});

	} catch (error: any) {
		handleLocalError(error);
	}
}

/**
 * Añadir tareas automáticas.
 */
function scheduleCronJobs() {
	CronJob.from({
		cronTime: "0 0 * * *",
		onTick: deleteCardPreviews,
		onComplete: null,
		start: true
	});
	CronJob.from({
		cronTime: "0 0 * * *",
		onTick: updateDataFromDatabase,
		onComplete: null,
		start: true
	});
}
