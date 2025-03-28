import request from "supertest";
import { Express } from "express";

/**
 * Test to register a user.
 */
export const registerUserTest = (server: Express, email: string, password: string, phone: string) => {
	it('Should register a user.', async () => {
		const response = await request(server)
			.post('/api/user/register')
			.send({ "email": email, "password": password, "phone": phone })
			.set('Accept', 'serverlication/json')
			.expect(201)
		expect(response.body.email).toEqual(email);
		expect(response.body.phone).toEqual(phone);
		expect(response.body._id)
	});
}

/**
 * Test to login  a user.
 */
export const loginUserTest = (server: Express, email: string, password: string, callBack: Function) => {

	it('Should login a user.', async () => {
		const response = await request(server)
			.post('/api/user/login')
			.send({ "email": email, "password": password })
			.set('Accept', 'serverlication/json')
			.expect(201)

		expect(response.body.user.email).toEqual(email);
		expect(response.body.user._id);
		expect(response.body.token);

		callBack(response.body.token, response.body.user._id);

	});

}

/**
 * Test to delete a user.
 * @param server 
 * @param id 
 * @param token 
 */
export const deleteUserTest = (server: Express, id: string, token: string) => {
	it('Should delete a user', async () => {
		const response = await request(server)
			.delete(`/api/user/deleteUser/${id}`)
			.auth(token, { type: 'bearer' })
			.set('Accept', 'serverlication/json')
			.expect(200)
	});
}