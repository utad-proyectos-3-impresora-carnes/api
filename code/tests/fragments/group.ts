import request from "supertest";
import { Express } from "express";

/**
 * Test to get all the groups metadata.
 * @param server The server to send the query.
 * @param token The token of authorization.
 * @returns The query response.
 */
export const getGroupMetadataTest = async (server: Express, token: string) => {
	const response = await request(server)
		.get("/api/group/metadata")
		.auth(token, { type: 'bearer' })
		.set('Accept', 'serverlication/json')
		.expect(200);

	return response;
}

/**
 * Test to get all the groups.
 * @param server The server to send the query.
 * @param token The token of authorization.
 * @returns The query response.
 */
export const getAllGroupsTest = async (server: Express, token: string) => {
	const response = await request(server)
		.get("/api/group/allGroups")
		.auth(token, { type: 'bearer' })
		.set('Accept', 'serverlication/json')
		.expect(200);

	return response;
}

/**
 * Test to get all the groups.
 * @param server The server to send the query.
 * @param token The token of authorization.
 * @param filters The filters to apply.
 * @returns The query response.
 */
export const getFilteredGroupsTest = async (server: Express, token: string, filters: any) => {
	const response = await request(server)
		.get("/api/group/filtered")
		.auth(token, { type: 'bearer' })
		.send(filters)
		.set('Accept', 'serverlication/json')
		.expect(200);

	return response;
}