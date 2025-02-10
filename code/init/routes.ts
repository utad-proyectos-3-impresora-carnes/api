const express = require("express");
const exampleRouter = require("../routers/example");


const router = express.Router();

router.use(express.json());

// Routers
router.use('/example', exampleRouter);

router.use('*', function (req:any, res:any) {
	res.send("<h1>404! Skill issue!</h1>");
});

export {router};