import fs from "fs"
import path from "path"

const __dirname = path.resolve();

const inputFilePath = path.join(__dirname, 'raw.txt');
const outputFilePath = path.join(__dirname, 'output.txt');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const lines = data.split('\n').map(line => line.trim());
    
    const uniqueLines = Array.from(new Set(lines));
    
    const result = uniqueLines.join('\n');
    
    fs.writeFile(outputFilePath, result, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
            return;
        }

        console.log('Duplicate entries removed and new file created successfully.');
    });
});