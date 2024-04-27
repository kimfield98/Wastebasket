// Destructuring

let person = {
	name: "kimfield",
	age: 26
}

let name = person.name
let age = person['age']
// let { name, age } = person
// 위와 같이 표현도 가능해요! 구조 분해 할당

console.log(name, age) // 'kimfield', 26

let array = [1,2,3,4]
let [a,b,...rest] = array

console.log(a,b) // 1,2
console.log(rest) // [3,4]