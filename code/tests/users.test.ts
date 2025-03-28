import { server } from "../app";
import { UserMongoObjectInterface } from "../interfaces/user";
import { deleteUserTest, loginUserTest, registerUserTest } from "./fragments/user";

describe('users', (): void => {

	const userData: UserMongoObjectInterface = {
		email: "userPrueba@gmail.com",
		password: "12341234Aa$",
		phone: "123456789"
	}

	let token = "";

	it('Should register a user.', async () => {
		registerUserTest(server, userData.email, userData.password, userData.phone);
	});

	it('Should login a user.', async () => {
		const response = await loginUserTest(server, userData.email, userData.password);
		userData._id = response.body.user._id;
		token = response.body.token;
	});

	it('Should delete a user', async () => {
		deleteUserTest(server, userData._id, token);
	});

})