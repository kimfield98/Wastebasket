const fs = require('fs')

const inputData = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number)
const remainderArray = new Array(42).fill(0)
let result = 0

for (let i = 0; i < inputData.length; i++) {
  if (!isNaN(inputData[i]) && inputData[i] >= 0 && inputData[i] <= 1000) { // 유효성 검증 추가
    const remainder = inputData[i] % 42
    remainderArray[remainder] += 1
  }
}

for (let i = 0; i < remainderArray.length; i++) {
  if(remainderArray[i] !== 0) {
    result += 1
  }
}

console.log(result)