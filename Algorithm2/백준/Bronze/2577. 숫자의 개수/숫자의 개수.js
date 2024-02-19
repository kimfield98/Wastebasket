const fs = require('fs')

const inputData = fs.readFileSync('/dev/stdin').toString().split('\n').map(Number)

const res = inputData[0] * inputData[1] * inputData[2];
const resArray = res.toString()
const countArray = new Array(10).fill(0)

for (let i = 0; i < resArray.length; i++) {
  const num = parseInt(resArray[i])
  countArray[num]++
}

for (let i = 0; i < countArray.length; i++) {
  console.log(countArray[i])
}