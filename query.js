import fs from "fs"
import path from "path"

const __dirname = path.resolve();

// Input file containing request IDs (one per line)
const inputFilePath = path.join(__dirname, 'output.txt');
// Output file to write the query
const outputFilePath = path.join(__dirname, 'query.txt');

// Function to generate the query from the request IDs
function generateQuery(requestIds) {
    // Construct the SEARCH part of the query
    const searchQuery = requestIds.map(id => `SEARCH(" \`${id}\` ")`).join(' OR ');
    
    // Full query string
    return `jsonPayload.guest_subnet="dec37933239846834b3BfD408913Ed3dbEf6588F"\nAND (${searchQuery})`;
}

// Read the input file and generate the query
fs.readFile(inputFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Split the input file data by new lines to get an array of request IDs
    const requestIds = data.split('\n').map(line => line.trim()).filter(line => line !== '');

    // Generate the query
    const query = generateQuery(requestIds);

    // Write the query to the output file
    fs.writeFile(outputFilePath, query, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
            return;
        }
        console.log('Query successfully written to', outputFilePath);
    });
});