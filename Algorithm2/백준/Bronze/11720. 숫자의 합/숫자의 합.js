const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const strLen = parseInt(inputData[0])
let totalResult = 0

for (let i = 0; i < strLen; i++) {
    totalResult += parseInt(inputData[1][i])
}

console.log(totalResult)