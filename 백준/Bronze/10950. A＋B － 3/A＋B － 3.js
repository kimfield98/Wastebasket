const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString().split('\n')

const ArrayLen = parseInt(inputData[0])

for (let i = 0; i < ArrayLen; i++) {
    let newArr = inputData[i+1].split(' ').map(Number)
    console.log(newArr[0]+newArr[1])
}