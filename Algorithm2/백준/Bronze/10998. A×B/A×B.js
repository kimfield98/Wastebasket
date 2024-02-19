const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number)

console.log(inputData[0]*inputData[1])