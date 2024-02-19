const fs = require('fs')

const inputData = parseInt(fs.readFileSync('/dev/stdin').toString())

for (let i = 1; i <= inputData; i++) {
  console.log('*'.repeat(i))
}