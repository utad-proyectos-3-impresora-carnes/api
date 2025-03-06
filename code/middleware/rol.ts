/**
 * Función que comprueba si el usuario tiene uno de los roles válidos.
 * @param roles Roles válidos para acceder a este endpoint.
 * @returns Una función que compurba los roles.
 */
export default function checkRol(roles: number[]): Function {
	return (req: any, res: any, next: any): boolean => {
		const user = req.user;
		return roles.includes(user.role);
	}
}