import request from "supertest";
import { Express } from "express";

/**
 * Test to get all members metadata.
 * @param server The server to send the query.
 * @param token The token of authorization.
 * @returns The query response.
 */
export const getMemberMetadataTest = async (server: Express, token: string) => {
	const response = await request(server)
		.get("/api/member/metadata")
		.auth(token, { type: 'bearer' })
		.set('Accept', 'serverlication/json')
		.expect(200);

	return response;
}


/**
 * Test to get all members.
 * @param server The server to send the query.
 * @param token The token of authorization.
 * @returns The query response.
 */
export const getAllMembersTest = async (server: Express, token: string) => {
	const response = await request(server)
		.get("/api/member/allMembers")
		.auth(token, { type: 'bearer' })
		.set('Accept', 'serverlication/json')
		.expect(200);

	return response;
}

/**
 * Test to get filtered members.
 * @param server The server to send the query.
 * @param token The token of authorization.
 * @returns The query response.
 */
export const getFilteredMembersTest = async (server: Express, token: string, memberFilters: any) => {
	const response = await request(server)
		.get("/api/member/filtered")
		.auth(token, { type: 'bearer' })
		.set('Accept', 'serverlication/json')
		.send(memberFilters)
		.expect(200);

	return response;
}

