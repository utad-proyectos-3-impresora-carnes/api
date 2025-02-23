import { Schema, model } from "mongoose";
import GroupTypes from "../constants/groupTypes";

/**
 * Crear el esquema del grupo
 */
const GroupSchema = new Schema(
	{
		// El nombre del grupo.
		name: {
			type: Schema.Types.String,
			unique: true
		},
		// El tipo del grupo. Solo los valores del enum son válidos.
		type: {
			type: Schema.Types.String,
			enum: GroupTypes
		},
		// Fecha de creación del grupo
		creationYear: {
			type: Schema.Types.Date
		}
	},
	{
		// Guarda Los tiempos de creación.
		timestamps: true,
		versionKey: false
	}

);

/**
 * Crear un modelo de mongoose.
 */
const GroupModel = model('Group', GroupSchema);

/**
 * Exportarlo.
 * No debería de cambiar nada en la base de datos.
 * Se actualizara con este documento una vez que sea usado por primera vez.
 */
export default GroupModel;