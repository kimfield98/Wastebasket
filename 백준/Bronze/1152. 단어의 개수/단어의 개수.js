const fs = require('fs')

const inputData = fs.readFileSync('/dev/stdin').toString().trim()
const arr = inputData.split(' ')

let count = 0

if (arr.length === 0) {
    console.log(0)
} else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== '') {
          count++
      }
    }
    console.log(count)
}