import request from "supertest";
import { server } from "../app";
import { loginAsAdmin, createTestMember, deleteTestMember } from "../fragments/member";

describe("Member API", () => {
    let authToken: string;
    let testMemberId: string;

    beforeAll(async () => {
        authToken = await loginAsAdmin();
        testMemberId = await createTestMember(authToken);
    });

    it("Should get all members", async () => {
        const response = await request(server)
            .get("/api/member/")
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("Should get filtered members", async () => {
        const response = await request(server)
            .get("/api/member/filtered?name=John")
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("Should generate a preview of a member's card", async () => {
        const response = await request(server)
            .get(`/api/member/preview/${testMemberId}`)
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("string");
    });

    it("Should update member validation status", async () => {
        const response = await request(server)
            .patch(`/api/member/editMemberValidatioStatus/${testMemberId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send({ validationState: "validated" });

        expect(response.status).toBe(200);
        expect(response.body.validationState).toBe("validated");
    });

    it("Should print members", async () => {
        const response = await request(server)
            .patch("/api/member/printMembers")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ memberIds: [testMemberId] });

        expect(response.status).toBe(501); // Este es el código que devuelves cuando la funcionalidad no está implementada
    });

    afterAll(async () => {
        await deleteTestMember(authToken, testMemberId);
    });
});
