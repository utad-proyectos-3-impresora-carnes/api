const createServer = require("./init/server");

require('dotenv').config();

const server = createServer();

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`Server listening on: http://localhost:${port}`)
});
