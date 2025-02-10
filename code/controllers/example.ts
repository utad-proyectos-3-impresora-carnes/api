export { };

const ExampleService = require('../services/example');

function exampleGet(req: Express.Request, res: Express.Response) {

	const exampleService = new ExampleService();

	return res.status(200).send({
		text: "Thou arth seeing an example GET!",
		fetchedData: exampleService.getUsefulArray()
	});

}

function examplePost(req, res) {
	return res.status(200).send("Thou arth seeing an example POST!");
}

function examplePut(req, res) {
	return res.status(200).send("Thou arth seeing an example PUT!");
}

function examplePatch(req, res) {
	return res.status(200).send("Thou arth seeing an example PATCH!");
}

function exampleDelete(req, res) {
	return res.status(200).send("Thou arth seeing an example DELETE!");
}

module.exports = {
	exampleGet,
	examplePost,
	examplePut,
	examplePatch,
	exampleDelete
};
