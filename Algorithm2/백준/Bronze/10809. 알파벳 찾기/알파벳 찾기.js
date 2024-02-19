const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString()

const result = []

for (let i = 97; i <= 122; i++) {
  result.push(inputData.indexOf(String.fromCharCode(i)))
}

console.log(result.join(' '))