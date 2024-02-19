const fs = require('fs');
let inputData = fs.readFileSync('/dev/stdin').toString().split('\n')

solution(inputData[0])

function solution(str) {
    
    let lowStr = str.toLowerCase()
    let obj = {}

    for(let i=0; i<lowStr.length; i++){
        if(obj[lowStr[i]] === undefined) {
            obj[lowStr[i]] = 1
        } else {
            obj[lowStr[i]] += 1
        }
    }
  
    let result =''
    let count=0

    for(char in obj){
        if(obj[char] > count){
            count = obj[char]
            result = char.toUpperCase()
        } else if (obj[char] === count){
            result ='?'
        }
    }
    console.log(result)
}