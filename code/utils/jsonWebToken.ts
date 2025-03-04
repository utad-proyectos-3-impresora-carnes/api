import jwt from "jsonwebtoken";

/**
 * Servicio para realizar las operaciones de generación/verificación de tokens.
 */
export default class JsonWebTokenService {

	private readonly tokenSecret: string;
	private readonly tokenDuration: string;

	constructor() {

		this.tokenSecret = process.env.TOKEN_KEY_CONTENTS;
		this.tokenDuration = process.env.TOKEN_KEY_DURATION;

	}

	/**
	 * Generate a token
	 * @param tokenData The object to add to the token.
	 * @returns A JWT token.
	 */
	async generateUserToken(tokenData: Object) {

		const token = jwt.sign(tokenData, this.tokenSecret, {
			expiresIn: this.tokenDuration,
		});

		return token;

	}
}