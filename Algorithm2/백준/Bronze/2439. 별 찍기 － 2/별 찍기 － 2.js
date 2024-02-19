const fs = require('fs')

const inputData = parseInt(fs.readFileSync('/dev/stdin').toString())

for (let i = 1; i <= inputData; i++) {
  const spaces = ' '.repeat(inputData - i)
  const stars = '*'.repeat(i)
  console.log(spaces+stars)
}