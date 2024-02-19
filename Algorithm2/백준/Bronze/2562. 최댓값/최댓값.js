const fs = require('fs')

const inputData = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number)

let maxItem = inputData[0]
let maxIndex = 0

for (let i = 0; i < inputData.length; i++) {
  if (maxItem < inputData[i]) {
    maxItem = inputData[i]
    maxIndex = i
  }
}

console.log(maxItem)
console.log(maxIndex + 1)