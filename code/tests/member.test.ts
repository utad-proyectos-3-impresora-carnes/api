import { server } from "../app";
import { UserMongoObjectInterface } from "../interfaces/user";
import { deleteUserTest, loginUserTest, registerUserTest } from "./fragments/user";
import MemberService from "../utils/member";
import { MemberMongoObjectInterface } from "../interfaces/member";
import { editMemberValidationStateTest, getAllMembersTest, getFilteredMembersTest, getMemberMetadataTest, previewMemberTest, printMemberTest } from "./fragments/member";
import { ValidationStates } from "../constants/validationStates";

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
			dni: "123456789A",
			profileImageLink: "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
			group: {
				name: "Grupo prueba"
			}
		});
	});

	it("Should get members metadata", async () => {
		await getMemberMetadataTest(server, token);
	})

	it("Should get all members", async () => {
		await getAllMembersTest(server, token);
	})

	it("Should get filtered members", async () => {
		await getFilteredMembersTest(server, token, {
			fullName: testMember.fullName
		});
	})

	it("Should get string to the path of the image generated", async () => {
		await previewMemberTest(server, token, testMember._id);
	})

	it("Should edit the validation status of a member", async () => {
		await editMemberValidationStateTest(server, token, testMember._id, ValidationStates.VALIDATED);
	})

	it("Should send a member to print", async () => {
		await printMemberTest(server, token, [testMember._id]);
	})

	afterAll(async () => {
		await deleteUserTest(server, userData._id, token);
		await memberService.deleteMember(testMember._id);
	});

});
