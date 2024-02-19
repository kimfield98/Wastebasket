const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const testCaseLen = inputData.length

for (let i = 0; i < testCaseLen; i++) {
    let newArr = inputData[i].split(' ').map(Number)
    console.log(newArr[0]+newArr[1])
}