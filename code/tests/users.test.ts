import request from "supertest";
import { server } from "../app";

describe('users', (): void => {


	var token = ""
	var id = ""

	it('should register a user', async () => {
		const response = await request(server)
			.post('/api/user/register')
			.send({ "email": "user25@test.com", "password": "HolaMundo.01" })
			.set('Accept', 'serverlication/json')
			.expect(200)
		// expect(response.body.user.name).toEqual('Menganito')
		expect(response.body.userObject.email).toEqual('user25@test.com')
		// expect(response.body.userObject.role).toEqual('user')

		token = response.body.token
		id = response.body.userObject._id
	});

	it('should get the users', async () => {
		const response = await request(server)
			.get('/api/user/getUserData')
			.auth(token, { type: 'bearer' })
			.set('Accept', 'serverlication/json')
			.expect(200)
		expect(response.body.email).toEqual('user25@test.com')
	});

	it('should delete a user', async () => {
		const response = await request(server)
			.delete('/api/user/deleteUser')
			.auth(token, { type: 'bearer' })
			.set('Accept', 'serverlication/json')
			.expect(200)
	});

})