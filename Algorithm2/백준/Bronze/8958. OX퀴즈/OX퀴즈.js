let fs = require('fs')
let inputData = fs.readFileSync('/dev/stdin').toString().split('\n')

let num = Number(inputData[0])

for (let i = 1; i <= num; i++) {
  let count = 0
  let sum = 0

  for(let j = 0; j < inputData[i].length; j++) {
    if (inputData[i][j] === 'O') {
      count++
    } else {
      count = 0
    }
    sum += count
  }
  console.log(sum)
}