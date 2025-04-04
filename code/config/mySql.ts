import { Sequelize, Options } from "sequelize"

/**
 * Class to handle the mysql connection.
 */
export class MySqlConnection {

	/**
	 * Unique class of mysql connection.
	 */
	private static instance: MySqlConnection;
	private readonly _options: Options;
	private readonly _connection: Sequelize;
	private readonly _databaseName: string;

	private constructor() {

		this._options = {
			username: process.env.MYSQL_DB_USER,
			password: process.env.MYSQL_DB_PASSWORD,
			host: process.env.MYSQL_DB_URL,
			port: Number(process.env.MYSQL_DB_PORT),
			dialect: "mysql"
		};

		this._databaseName = process.env.MYSQL_DB;

		this._connection = new Sequelize({ ...this._options, database: this._databaseName });

	}

	public static getInstance(): MySqlConnection {
		if (!MySqlConnection.instance) {
			MySqlConnection.instance = new MySqlConnection();
		}
		return MySqlConnection.instance;
	}

	public get connection(): Sequelize {
		return this._connection;
	}

	public async checkDatabaseExists(): Promise<void> {
		try {

			const connection: Sequelize = new Sequelize(this._options);

			await connection.query(`CREATE DATABASE IF NOT EXISTS \`${this._databaseName}\`;`);

			await connection.close();

		} catch (error) {

			throw error;

		}
	}

	public async initializeConnection(): Promise<void> {
		try {

			await this._connection.authenticate();
			this._connection.sync();

		} catch (error) {

			throw error;

		}
	}

}

