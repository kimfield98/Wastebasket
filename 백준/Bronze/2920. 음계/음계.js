const fs = require('fs')

const inputData = fs.readFileSync('/dev/stdin').toString().split(' ').map(Number)
let result = 'mixed'

if (inputData[0] === 1) {
  result = 'ascending';
  for (let i = 0; i < inputData.length - 1; i++) {
    if (inputData[i] + 1 !== inputData[i + 1]) {
      result = 'mixed';
      break;
    }
  }
} else if (inputData[0] === 8) {
  result = 'descending';
  for (let i = 0; i < inputData.length - 1; i++) {
    if (inputData[i] - 1 !== inputData[i + 1]) {
      result = 'mixed';
      break;
    }
  }
}

console.log(result)