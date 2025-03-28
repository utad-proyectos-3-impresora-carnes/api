import request from "supertest";
import { Express } from "express";
/**
 * Test to register a user.
 */
export const registerUserTest = (server: Express, email: string, password: string, phone: string) => {
	it('should register a user', async () => {
		const response = await request(server)
			.post('/api/user/register')
			.send({ "email": email, "password": password, "phone": phone })
			.set('Accept', 'serverlication/json')
			.expect(200)
		console.log(response.body);
		expect(response.body.userObject.email).toEqual(email);
	});
}