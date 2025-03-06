interface HttpErrorOptions {
	res: any;
	message?: string;
	statusCode?: number;
	lang?: string;
}

/**
 * Class for an standars http error.
 */
export default class HttpError extends Error {

	private readonly res: any;
	private readonly statusCode: number;

	/**
	 * 
	 * @param res The response object of the query
	 * @param code The code of the error
	 * @param statusCode The http status code to display to the client.
	 */
	constructor(options: HttpErrorOptions) {

		super(options.message);

		this.res = options.res;
		this.statusCode = options.statusCode;

	}

	/**
	 * Sends the response with the error.
	 */
	send() {
		this.res.status(this.statusCode).send(this.message);
	}

}