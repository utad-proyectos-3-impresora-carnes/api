import { server } from "../app";
import { UserMongoObjectInterface } from "../interfaces/user";
import { deleteUserTest, loginUserTest, registerUserTest } from "./fragments/user";

describe("Members", () => {
	const userData: UserMongoObjectInterface = {
		email: "groupPrueba@gmail.com",
		password: "12341234Aa$",
		phone: "123456789"
	}

	let token = "";

	beforeAll(async () => {
		await registerUserTest(server, userData.email, userData.password, userData.phone);
		const response = await loginUserTest(server, userData.email, userData.password);
		userData._id = response.body.user._id;
		token = response.body.token;
	});

	afterAll(async () => {
		await deleteUserTest(server, userData._id, token);
	});

});
