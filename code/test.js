const { exec } = require('child_process');

async function printFile(fileContents) {
    const windir = process.env.WINDIR; // Get the Windows directory
    const scriptPath = `${windir}\\System32\\Printing_Admin_Scripts\\en-US\\prnmngr.vbs`; // Correct script path

    // exec(`print .\\README.md`, (err, stdout, stderr) => {
    exec(`cscript ${windir}\\System32\\Printing_Admin_Scripts\\en-US\\prnmngr.vbs -l`, (err, stdout, stderr) => {
		// exec(`cscript`, (err, stdout, stderr) => {
    // exec(`cscript "${scriptPath}"`, (err, stdout, stderr) => {
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

printFile();
