import { Schema, model } from "mongoose";

/**
 * Crear el esqema del usuario
 */
const UserSchema = new Schema(
	{
		name: {
			type: String
		},
		age: {
			type: Number
		},
		password:{
			type:String,
			select:false
		}
	},
	{
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