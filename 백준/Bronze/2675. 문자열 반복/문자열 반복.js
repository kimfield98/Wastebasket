const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const T = parseInt(inputData[0])

for (let i = 0; i < T; i++) {
  let newArr = inputData[i+1].split(' ')
  let str = newArr[1].split('')
  let resArr = []

  for (let j = 0; j < str.length; j++) {
    resArr.push(str[j].repeat(parseInt(newArr[0])))
  }
  console.log(resArr.join(''))
}