export { };

class ExampleService {

	private usefulString: string;
	private usefulNumber: number;
	private usefulBool: boolean;
	private usefulArray: Array<any>;

	constructor() {

		this.usefulString = "Example";
		this.usefulNumber = 0;
		this.usefulBool = true;
		this.usefulArray = new Array<any>();

	};

	public getUsefulString(): string {
		return this.usefulString;
	}

	public getUsefulNumber(): number {
		return this.usefulNumber;
	}

	public getUsefulBool(): boolean {
		return this.usefulBool;
	}

	public getUsefulArray(): Array<any> {
		return this.usefulArray;
	}

}

module.exports = {
	ExampleService
};