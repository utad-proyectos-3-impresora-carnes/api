export { };

const express = require("express");
const router = require("./routes");

function createServer(): any {

	const server = express();

	server.use(router);

	return server;
}

module.exports = createServer;