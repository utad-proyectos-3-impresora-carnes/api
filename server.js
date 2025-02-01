const http = require('http');

const server = http.createServer((req, res) => {

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
			message = printDoc(req, res);
			break;

		default:
			message = "Hello World!";
	}

	res.end(message);
})

function obtaintextToPrint(req){
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

	return body;
}

function printDoc(req, res) {

	const textToPrint = obtaintextToPrint(req);

	console.log(textToPrint);

}


const PORT = process.env.PORT || 3000;

server.listen(PORT);