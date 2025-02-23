import { Schema, model } from "mongoose";

/**
 * Crear el esquema del usuario
 */
const UserSchema = new Schema(
	{
		// El email.
		email: {
			type: Schema.Types.String,
			unique: true
		},
		// Contraseña cifrada, marcada para que no se devuelva en los select.
		password: {
			type: Schema.Types.String,
			select: false
		},
		// Teléfono del usuario. De momento no es usado pero será necesario para el doble factor de autenticación.
		phone: {
			type: Schema.Types.String
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
const UserModel = model('User', UserSchema);

/**
 * Exportarlo.
 * No debería de cambiar nada en la base de datos.
 * Se actualizara con este documento una vez que sea usado por primera vez.
 */
export default UserModel;