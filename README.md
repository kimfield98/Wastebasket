// spread

let person = {
	anme: "kimfield",
	age: 26
}

let person2 = {...person}
let person3 = person

console.log(person2) // { name: "kimfield", age: 26 }
console.log(person3) // { name: "kimfield", age: 26 }

// 값은 똑같지만, 복사 매커니즘이 달라요-
// person2 는 객체가 복사되어 두 개인 상태!
// person3 은 객체의 주소값만 복사! 객체는 하나, 참조하는 변수가 2개

let a = [1,2]
let b = [...a,3]
console.log(1,2,3)