const fs = require('fs')

const inputData = fs.readFileSync('/dev/stdin').toString().split(' ').map(Number)

let hour = inputData[0]
let minute = inputData[1]


if (minute >= 45) {
  minute -= 45
} else {
  hour = hour - 1 < 0 ? 23 : hour - 1
  minute += 15
}

console.log(hour, minute)