const fs = require('fs')
const inputData = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const A = parseInt(inputData.shift())

for (let i = 0; i < A; i++) {
  const HWN = inputData[i].split(' ')
  let H = parseInt(HWN.shift())
  HWN.shift()
  let N = parseInt(HWN.shift())
  let roomCnt = 1
  
  while (N > H) {
    roomCnt++
    N = N - H
  }
  if (roomCnt < 10) {
    console.log(`${N}0${roomCnt}`)
  } else {
    console.log(`${N}${roomCnt}`)
  }
}