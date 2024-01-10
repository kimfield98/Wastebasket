const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString().split('\n')

const fstArr = inputData[0].split(' ').map(Number)
// console.log(firstArr);  //--> [ 10, 5 ]

const secArr = inputData[1].split(' ').map(Number)
// console.log(secArr);  //-->  [ 1, 10, 4, 9, 2, 3, 8, 5, 7, 6 ]

let result = ''
for (let i = 0; i < fstArr[0]; i++) {
  if (secArr[i] < fstArr[1]) {
    result += secArr[i] + ' '
  }
}

console.log(result)