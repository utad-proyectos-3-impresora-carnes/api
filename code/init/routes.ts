export { };

const express = require("express");

const router = express.Router();

router.use(express.json());

// Routers


router.use('*', function (req, res) {
	res.send("<h1>404! Skill issue!</h1>");
});


module.exports = router;