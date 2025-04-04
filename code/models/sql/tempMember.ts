import { DataTypes } from "sequelize";
import { MySqlConnection } from "../../config/mysql";

const TempMember = MySqlConnection.getInstance().connection.define(
	"TemporaryMember",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
	}
)

export { TempMember }