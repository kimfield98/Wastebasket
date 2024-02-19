const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const intArr = inputData[1].split(' ').map(Number)
let min = intArr[0]
let max = intArr[0]

for (let i = 1; i < intArr.length; i++) {
  if (intArr[i] > max) {
    max = intArr[i]
  } else if (intArr[i] < min) {
    min = intArr[i]
  }
}

console.log(min, max)