import fs from "fs"
import path from "path"

const __dirname = path.resolve();

const inputFilePath = path.join(__dirname, 'output.txt');
const outputFilePath = path.join(__dirname, 'query.txt');

function generateQuery(requestIds) {
    const searchQuery = requestIds.map(id => `SEARCH(" \`${id}\` ")`).join(' OR ');
    
    return `jsonPayload.guest_subnet="dec37933239846834b3BfD408913Ed3dbEf6588F"\nAND (${searchQuery})`;
}

fs.readFile(inputFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    
    const requestIds = data.split('\n').map(line => line.trim()).filter(line => line !== '');
    const query = generateQuery(requestIds);

    fs.writeFile(outputFilePath, query, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
            return;
        }
        console.log('Query successfully written to', outputFilePath);
    });
});