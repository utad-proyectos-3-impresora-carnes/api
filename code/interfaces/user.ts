/**
 * Interfaz de un objeto usuario.
 */
export default interface UserInterface {
	/**
	 * El id, no es obligatorio. Se genera automáticamente por mongodb.
	 */
	_id?: string,
	
	/**
	 * El email
	 */
	email: string,
	
	/**
	 * La contraseña del usuario.
	 */
	password: string,

	/**
	 * El teléfono del usuario.
	 */
	phone: string,
}