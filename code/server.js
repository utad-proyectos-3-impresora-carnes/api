const fs = require('fs').promises;
const { exec } = require('child_process');
const path = require('path');
const http = require('http');

//Cambio de prueba

const server = http.createServer(async (req, res) => {

	res.setHeader('Access-Control-Allow-Origin', '*'); // Or specify your frontend's origin
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Specify allowed methods
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Specify allowed headers (if any)

	const url = req.url;

	// Set the Content-Type header to indicate JSON if you intend to send JSON.
	res.setHeader('Content-Type', 'text/plain'); // Or 'application/json' if sending JSON

	let message = ""; // Initialize a variable to hold the message

	switch (url) {
		case "/home":
			message = "Welcome!";
			break;
		case "/user":
			message = "You are a person!";
			break;
		case "/test":
			message = "The test was successful!";
			break;
		case "/render":
			message = "The render app works!";
			break;
		case "/print":
			message = await printDoc(req, res);
			break;

		default:
			message = "Hello World!";
	}

	res.end(message);
})

async function obtaintextToPrint(req) {
	let body = null;

	await req.on('data', chunk => {
		body = JSON.parse(chunk.toString());
	});

	return body;
}

async function createFileToPrint(fileContents) {
	const dirPath = path.join(__dirname, 'out');

	try {
		// Ensure the ./out directory exists
		await fs.mkdir(dirPath, { recursive: true });

		// Generate a unique filename
		const fileName = `print_text.txt`;
		const filePath = path.join(dirPath, fileName);

		// Write content to the file
		await fs.writeFile(filePath, fileContents, 'utf8');

		return filePath;
	} catch (error) {
		console.error('Error creating file:', error);
		throw error;
	}
}

async function printFile(filePath) {
	exec(`print ${filePath}`, (err, stdout, stderr) => {
		if (err) {
			console.error(`Error: ${err.message}`);
			return;
		}
		if (stderr) {
			console.error(`Stderr: ${stderr}`);
			return;
		}
		console.log(`Output:\n${stdout}`);
	});
}


async function printDoc(req, res) {

	const body = await obtaintextToPrint(req);

	if (!body) {
		return "Pre flight lol";
	}

	const textToPrint = body.textToPrint;

	const fileName = await createFileToPrint(textToPrint);

	const output = await printFile(fileName);

	return "Printing!";

}


const PORT = process.env.PORT || 3000;

server.listen(PORT);