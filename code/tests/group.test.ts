import { server } from "../app";
import { UserMongoObjectInterface } from "../interfaces/user";
import { getAllGroupsTest, getFilteredGroupsTest, getGroupMetadataTest } from "./fragments/group";
import { deleteUserTest, loginUserTest, registerUserTest } from "./fragments/user";

describe("Groups", (): void => {
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

	it("Should get group metadata", async () => {
		await getGroupMetadataTest(server, token);
	});

	it("Should get all groups", async () => {
		await getAllGroupsTest(server, token);
	});

	it("Should get groups filtered", async () => {
		await getFilteredGroupsTest(server, token, {
			name: "Ice",
			type: null,
			creationYear: null,
			limit: 10,
			offset: 0
		})
	});

	afterAll(async () => {
		await deleteUserTest(server, userData._id, token);
	});

})