const fs = require('fs')
const inputData = parseInt(fs.readFileSync('/dev/stdin').toString())

if (inputData >= 90 && inputData <= 100) {
    console.log('A')
} else if (inputData >= 80 && inputData < 90) {
    console.log('B')
} else if (inputData >=70 && inputData < 80) {
    console.log('C')
} else if (inputData >=60 && inputData < 70) {
    console.log('D')
} else {
    console.log('F')
}