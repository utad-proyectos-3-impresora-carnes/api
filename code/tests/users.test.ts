import request from "supertest";

import { server } from "../app";
import { UserMongoObjectInterface } from "../interfaces/user";

describe('users', (): void => {

	const userData: UserMongoObjectInterface = {
		email: "userPrueba@gmail.com",
		password: "12341234Aa$",
		phone: "123456789"
	}

	let token = "";

	it('Should register a user.', async () => {
		const response = await request(server)
			.post('/api/user/register')
			.send({ "email": userData.email, "password": userData.password, "phone": userData.phone })
			.set('Accept', 'serverlication/json')
			.expect(201)
		expect(response.body.email).toEqual(userData.email);
		expect(response.body.phone).toEqual(userData.phone);
		expect(response.body._id)
	});

	it('Should login a user.', async () => {
		const response = await request(server)
			.post('/api/user/login')
			.send({ "email": userData.email, "password": userData.password })
			.set('Accept', 'serverlication/json')
			.expect(201)
		expect(response.body.user.email).toEqual(userData.email);
		expect(response.body.user._id);
		expect(response.body.token);

		userData._id = response.body.user._id;
		token = response.body.token;
	});

	it('Should delete a user', async () => {
		const response = await request(server)
			.delete(`/api/user/${userData._id}`)
			.auth(token, { type: 'bearer' })
			.set('Accept', 'serverlication/json')
			.expect(200)
	});

})