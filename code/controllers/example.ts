const ExampleService = require('../services/example');

function exampleGet(req:any, res: any) {

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

export default {
	exampleGet,
	examplePost,
	examplePut,
	examplePatch,
	exampleDelete
};
