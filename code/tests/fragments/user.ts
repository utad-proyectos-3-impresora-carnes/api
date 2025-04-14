import request from "supertest";
import { Express } from "express";
import { UserMongoObjectInterface } from "../../interfaces/user";

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
 * @param server The server to send the query.
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
 * Test to obtain the user by token.
 * @param server The server to send the query.
 * @param token The token of the user.
 * @returns The user data.
 */
export const getUserByTokenTest = async (server: Express, token: string) => {
	const response = await request(server)
		.get('/api/user/getUserByToken')
		.auth(token, { type: 'bearer' })
		.set('Accept', 'serverlication/json')
		.expect(200);

	return response;
}

/**
 * Test to obtain the user by id.
 * @param server The server to send the query.
 * @param id The id of the user.
 * @returns The user data.
 */
export const getUserByIdTest = async (server: Express, token: string, id: string) => {
	const response = await request(server)
		.get(`/api/user/getUserById/${id}`)
		.auth(token, { type: 'bearer' })
		.set('Accept', 'serverlication/json')
		.expect(200);

	return response;
}

/**
 * Test to edit a user by user id.
 * @param server The server to send the query.
 * @param token The token of the user.
 * @param userData The new data of the user.
 * @returns The user data.
 */
export const editUserByIdTest = async (server: Express, token: string, userData: UserMongoObjectInterface) => {
	const response = await request(server)
		.patch(`/api/user/editUserById/${userData._id}`)
		.auth(token, { type: 'bearer' })
		.send({ ...userData })
		.set('Accept', 'serverlication/json')
		.expect(200);

	expect(response.body.email).toEqual(userData.email);

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
		.delete(`/api/user/deleteUserById/${id}`)
		.auth(token, { type: 'bearer' })
		.set('Accept', 'serverlication/json')
		.expect(200);

	return response;
}