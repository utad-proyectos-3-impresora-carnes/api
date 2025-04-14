import { server } from "../app";
import { UserMongoObjectInterface } from "../interfaces/user";
import { deleteUserTest, loginUserTest, registerUserTest } from "./fragments/user";
import MemberModel from "../models/noSql/members";

describe("Members", () => {
	const userData: UserMongoObjectInterface = {
		email: "membersPrueba@gmail.com",
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

	it("Should get members metadata", async () => {

	})

	it("Should get all members", async () => {

	})

	it("Should get filtered members", async () => {

	})

	it("Should get string to the path of the image generated", async () => {

	})

	it("Should edit the validation status of a member", async () => {

	})

	it("Should send a member to print", async () => {

	})

	afterAll(async () => {
		await deleteUserTest(server, userData._id, token);
	});

});
