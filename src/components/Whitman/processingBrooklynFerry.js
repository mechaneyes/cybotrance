const fs = require('fs');

const inputFile = './crossingBrooklynFerry.txt';
const outputFile = './processedFerry.txt';

const file = fs.readFileSync(inputFile, 'utf-8');
const lines = file.split('\n');

const lineArray = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  lineArray.push(`"${line.trim()}"`);
}

const output = lineArray.join(', ');
fs.writeFileSync(outputFile, output);

console.log(`Wrote ${lineArray.length} lines to ${outputFile}`);