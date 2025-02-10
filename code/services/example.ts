/**
 * Clase de servicio de ejemplo.
 * Debería ser lo único que se importa en un fichero de servicio.
 * Aquí se harán las llamadas a bases de datos u otros servicios.
 */
export default class ExampleService {

	/**
	 * Ejemplo de declaración de atributos.
	 */
	
	// Declaración de un string
	private usefulString: string;
	
	// Declaración de un número (no hay diferencias entre int o float, todo es number).
	public  usefulNumber: number;

	// Declaración de un booleano
	public readonly usefulBool: boolean; // Esto sería una constante.

	// Declaración de un array de numeros.
	public static readonly usefulArray: Array<number> = new Array<any>(1,2,3,4.5,5.55); // Cuidado con los atributos estáticas!

	constructor() {

		this.usefulString = "Example";
		this.usefulNumber = 0;
		this.usefulBool = true;

	};

	/**
	 * Es buena práctica tipar el resultado de las funciones.
	 * Ayudan a saber que esperar.
	 * Aunque si caeis en la desesperación y solo quereís hacer que X funcione se puede poner any y tirar.
	 * Con la consecunecia de que luego se desesperará otro intentando ver que viene de vuelta.
	 * 
	 * @returns Un string de ejemplo.
	 */
	public getUsefulString(): string {
		return this.usefulString;
	}

	public getUsefulNumber(): number {
		return this.usefulNumber;
	}

	public getUsefulBool(): boolean {
		return this.usefulBool;
	}

	public getUsefulArray(): Array<number> {
		//Referencia a atributo estático.
		return ExampleService.usefulArray;
	}

}