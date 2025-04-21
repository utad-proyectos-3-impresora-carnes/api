import { server } from "../app";
import { UserMongoObjectInterface } from "../interfaces/user";
import { deleteUserTest, loginUserTest, registerUserTest } from "./fragments/user";
import MemberService from "../utils/member";
import { MemberMongoObjectInterface } from "../interfaces/member";

describe("Members", () => {

	const memberService: MemberService = new MemberService();

	const userData: UserMongoObjectInterface = {
		email: "membersPrueba@gmail.com",
		password: "12341234Aa$",
		phone: "123456789"
	}

	let token = "";
	let testMember: MemberMongoObjectInterface;

	beforeAll(async () => {
		await registerUserTest(server, userData.email, userData.password, userData.phone);
		const response = await loginUserTest(server, userData.email, userData.password);
		userData._id = response.body.user._id;
		token = response.body.token;

		testMember = await memberService.createMember({
			fullName: "Miembro de prueba",
			dni: "123456789A"
		});
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
		await memberService.deleteMember(testMember._id);
	});

});
