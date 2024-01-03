const fs = require('fs')

const inputData = fs.readFileSync('/dev/stdin').toString().split(' ')

const sum = inputData.reduce((num1, num2) => num1 + num2**2, 0)

console.log(sum%10)