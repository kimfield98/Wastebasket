const fs = require('fs')

const inputData = parseInt(fs.readFileSync('/dev/stdin').toString())

for (let i = 1; i <= 9; i++) {
  console.log(`${inputData} * ${i} = ${inputData*i}`)
}
