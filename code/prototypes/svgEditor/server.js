const express = require("express");

const server = express();

server.use(express.json());

server.use("*", (req, res)=> {
	res.send("I'm a server.");
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> {
	console.log("Server listening on: http://localhost:"+PORT);
});
