import request from "supertest";
import { server } from "../app";
import { registerUserTest } from "./fragments/user";

describe('users', (): void => {

	registerUserTest(server, "userPrueba@gmail.com", "12341234Aa$", "123456789");

	// var token = ""
	// var id = ""



	// it('should get the users', async () => {
	// 	const response = await request(server)
	// 		.get('/api/user/getUserData')
	// 		.auth(token, { type: 'bearer' })
	// 		.set('Accept', 'serverlication/json')
	// 		.expect(200)
	// 	expect(response.body.email).toEqual('user25@test.com')
	// });

	// it('should delete a user', async () => {
	// 	const response = await request(server)
	// 		.delete('/api/user/deleteUser')
	// 		.auth(token, { type: 'bearer' })
	// 		.set('Accept', 'serverlication/json')
	// 		.expect(200)
	// });

})