import request from "supertest";
import { Express } from "express";

/**
 * Test to register a user.
 * @param server The server to send teh query.
 * @param email The email.
 * @param password The password
 * @param phone The phone.
 * @returns The query response.
 */
export const registerUserTest = async (server: Express, email: string, password: string, phone: string) => {
	const response = await request(server)
		.post('/api/user/register')
		.send({ "email": email, "password": password, "phone": phone })
		.set('Accept', 'serverlication/json')
		.expect(201);

	expect(response.body.email).toEqual(email);
	expect(response.body.phone).toEqual(phone);
	expect(response.body._id);

	return response;
}

/**
 * Test to log in.
 * @param server The server to send teh query.
 * @param email The email.
 * @param password The password
 * @returns The query response.
 */
export const loginUserTest = async (server: Express, email: string, password: string) => {
	const response = await request(server)
		.post('/api/user/login')
		.send({ "email": email, "password": password })
		.set('Accept', 'serverlication/json')
		.expect(201);

	expect(response.body.user.email).toEqual(email);
	expect(response.body.user._id);
	expect(response.body.token);

	return response;
}

/**
 * Test to delete a user.
 * @param server The server to send teh query.
 * @param id Id of teh user to delete.
 * @param token Token for authorization.
 */
export const deleteUserTest = async (server: Express, id: string, token: string) => {
	const response = await request(server)
		.delete(`/api/user/${id}`)
		.auth(token, { type: 'bearer' })
		.set('Accept', 'serverlication/json')
		.expect(200);

	return response;
}