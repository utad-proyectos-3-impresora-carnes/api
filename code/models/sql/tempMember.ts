import { DataTypes } from "sequelize";
import { MySqlConnection } from "../../config/mySql";

const TempMember = MySqlConnection.getInstance().connection.define(
	"TemporaryMember",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},

		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		dni: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		group: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		profileImage: {
			type: DataTypes.BLOB,
			allowNull: true
		}
	}
)

export { TempMember };