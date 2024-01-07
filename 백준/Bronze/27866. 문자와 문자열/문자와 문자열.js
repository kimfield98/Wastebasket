const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString().split('\n')
const str = inputData[0]
const num = parseInt(inputData[1])

console.log(str[num-1])