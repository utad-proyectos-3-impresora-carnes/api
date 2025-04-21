import { server } from "../app";
import { UserMongoObjectInterface } from "../interfaces/user";
import { deleteUserTest, getUserByTokenTest, loginUserTest, registerUserTest, getUserByIdTest, editUserByIdTest } from "./fragments/user";

describe("Users", (): void => {

	const userData: UserMongoObjectInterface = {
		email: "userPrueba@gmail.com",
		password: "12341234Aa$",
		phone: "123456789"
	}

	let token = "";

	beforeAll(async () => {
		await registerUserTest(server, userData.email, userData.password, userData.phone);
	});

	it('Should login a user.', async () => {
		const response = await loginUserTest(server, userData.email, userData.password);
		userData._id = response.body.user._id;
		token = response.body.token;
	});

	it("Should return a user by token", async () => {
		const response = await getUserByTokenTest(server, token);
	})

	it("Should return a user by id", async () => {
		const response = await getUserByIdTest(server, token, userData._id);
	})

	it("Should edit a user by ID", async () => {
		userData.email = "userEditado@gmail.com";
		const response = await editUserByIdTest(server, token, userData);
	})

	afterAll(async () => {
		await deleteUserTest(server, userData._id, token);
	});

})