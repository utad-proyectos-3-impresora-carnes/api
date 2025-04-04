import { Sequelize, Options } from "sequelize"

/**
 * Connect to mysql database
 */
export async function mySqlConnect() {

	try {

		const options: Options = {
			username: process.env.MYSQL_DB_USER,
			password: process.env.MYSQL_DB_PASSWORD,
			host: process.env.MYSQL_DB_URL,
			port: Number(process.env.MYSQL_DB_PORT),
			dialect: "mysql"

		};

		const databaseName: string = process.env.MYSQL_DB;

		await checkDatabaseExists(options, databaseName);

		options.database = databaseName;

		await initializeConnection(options);

	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

/**
 * Checks if the databse exists, otherwise, creates it.
 * @param options The options to connect to the db manager.
 * @param databaseName The name of the database to create.
 */
async function checkDatabaseExists(options: Options, databaseName: string): Promise<void> {
	try {

		const sequelize: Sequelize = new Sequelize(options);

		await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);

		await sequelize.close();

	} catch (error) {

		throw error;

	}
}

/**
 * Initializes the connection with all its configuration.
 * @param options The options to connect to the databse.
 */
async function initializeConnection(options: Options): Promise<void> {
	try {

		const connection: Sequelize = new Sequelize(options);

		await connection.authenticate();

		connection.sync();

	} catch (error) {

		throw error;

	}
}