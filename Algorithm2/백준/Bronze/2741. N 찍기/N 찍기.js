const fs = require('fs');

const inputData = parseInt(fs.readFileSync('/dev/stdin').toString());
let output = '';

for (let i = 1; i <= inputData; i++) {
  output += `${i}\n`;
}

console.log(output);
