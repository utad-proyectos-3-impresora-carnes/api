import { Schema, model } from "mongoose";

/**
 * Crear el esquema de los miembros.
 */
const MemberSchema = new Schema(
	{

		// El nombre completo del miembro.
		fullName: {
			type: Schema.Types.String
		},

		// El DNI del miembro.
		dni: {
			type: Schema.Types.String
		},

		// El grupo del miembro
		group: {

			_id: {
				type: Schema.Types.String
			},

			name: {
				type: Schema.Types.String
			}

		},

		// El link a la foto en el servidor de la UTAD
		profileImageLink: {
			type: Schema.Types.String
		},

		// Fecha de expedición del último carné (dejar en null si todavía no se ha impreso).
		lastCardPrintedDate: {
			type: Schema.Types.Date,
			default: undefined
		},

		// Fecha de creación del usuario
		creationYear: {
			type: Schema.Types.Number
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
const MemberModel = model('Member', MemberSchema);

/**
 * Exportarlo.
 * No debería de cambiar nada en la base de datos.
 * Se actualizara con este documento una vez que sea usado por primera vez.
 */
export default MemberModel;