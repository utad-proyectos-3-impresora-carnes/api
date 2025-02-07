const express = require("express");
const path = require("path")
const server = express();
const fs = require('fs');
const { JSDOM } = require('jsdom');

server.use(express.json());

var dir = path.join(__dirname, 'public');

server.use(express.static(dir));

server.post("/newCard", (req, res) => {

	const imageUrl = modifySvg(req.body);

	res.send({ imageUrl });

});

server.get("*", (req, res) => {
	res.sendFile(__dirname + "/fileEditor.html");
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log("Server listening on: http://localhost:" + PORT);
});

function  modifySvg(contents) {

	const newName = `updated_image_${Date.now()}.svg`;
	const newPath = path.join(__dirname, 'public', 'out', newName);

	console.log(contents);

	// Load the SVG file
	const svgPath = path.join(__dirname, 'public', 'PlantillaCarnet.svg');
	fs.readFile(svgPath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading SVG file:', err);
			return;
		}

		// Parse the SVG as a DOM object
		const dom = new JSDOM(data, { contentType: "image/svg+xml" });
		const document = dom.window.document;

		// Modify the image link
		const imageElement = document.getElementById('fotoAlumnos');
		if (imageElement) {
			imageElement.setAttribute('href', `${contents.imageUrl}`);
		}

		// Modify text content (if applicable)
		const nombreAlumno = document.getElementById('nombre');
		if (nombreAlumno) {
			nombreAlumno.textContent = contents.name;
		}

		const gradoAlumno = document.getElementById('grado');
		if (gradoAlumno) {
			gradoAlumno.textContent = contents.grado;
		}


		// Convert back to string
		const updatedSVG = document.documentElement.outerHTML;

		// Save the updated SVG
		fs.writeFile(newPath, updatedSVG, { flag: "wx", encoding:'utf-8' },(err) => {
			if (err) {
				console.error('Error writing SVG file:', err);
			} else {
				console.log('SVG successfully updated!');
			}
		});

	});

	return path.join('out', newName);

}
