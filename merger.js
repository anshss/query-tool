import fs from "fs"
import path from "path"

// Define the input and output file paths
const __dirname = path.resolve();

const inputFilePath = path.join(__dirname, 'raw.txt');
const outputFilePath = path.join(__dirname, 'output.txt');

// Read the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Split the content into lines and remove any potential extra spaces
    const lines = data.split('\n').map(line => line.trim());

    // Remove duplicate lines using a Set
    const uniqueLines = Array.from(new Set(lines));

    // Join the unique lines back into a single string
    const result = uniqueLines.join('\n');

    // Write the result to the output file
    fs.writeFile(outputFilePath, result, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
            return;
        }

        console.log('Duplicate entries removed and new file created successfully.');
    });
});