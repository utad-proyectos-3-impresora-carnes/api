import { Schema, model } from "mongoose";

/**
 * Crear el esqema del grupo
 */
const GroupSchema = new Schema(
	{
		// El nombre del grupo.
		name: {
			type: String
		},
		// El tipo del grupo. Solo los valores del enum son válidos.
		type: {
			type: String,
			enum: ["grado", "master", "ciclo", "staff"]
		},
		// Fecha de creación del grupo
		creationYear: {
			type: Date
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