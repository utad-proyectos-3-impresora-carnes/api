/**
 * Class for an standars http error.
 */
export default class HttpError extends Error {

	private readonly _statusCode: number;

	/**
	 * 
	 * @param res The response object of the query
	 * @param code The code of the error
	 * @param statusCode The http status code to display to the client.
	 */
	constructor(message: string, code: number) {
		super(message);
		this._statusCode = code;
	}

	public get statusCode(): number {
		return this._statusCode;
	}

}