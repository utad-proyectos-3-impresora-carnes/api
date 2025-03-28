import { server } from "../app";
import { UserMongoObjectInterface } from "../interfaces/user";
import { deleteUserTest, loginUserTest, registerUserTest } from "./fragments/user";

describe('users', (): void => {

	const userData: UserMongoObjectInterface = {
		email: "userPrueba@gmail.com",
		password: "12341234Aa$"
	}

	let token = "";
	const updateUserData = (tk: string, id: string) => {
		userData._id = id;
		token = tk;
	}

	registerUserTest(server, userData.email, userData.password, "123456789");

	loginUserTest(server, userData.email, userData.password, updateUserData);
	console.log("Token", token)
	console.log("user data", userData)

	deleteUserTest(server, userData._id, token);


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