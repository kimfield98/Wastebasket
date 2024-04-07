- **타입스크립트 어떻게 써?**
    - **일단 any 대신 unknown을 사용해.**
    
    ```jsx
    function doSomething(callback: any) {
    	callback()
    }
    
    // 타입스크립트에서 에러가 발생하지 않고, 실행 시 발생
    doSomething(1)
    ```
    
    - any일 경우 타입스크립트의 이점을 전혀 누리지 않겠다는 걸 의미해
    - unknown을 쓰면 모든 값을 할당할 수 있는 top type으로 지정해주는 거야. 근데 바로 사용하는 건 불가능해.
    
    ```jsx
    function doSomething(callback:unknown) {
    	callback() // 'callback' is of type 'unknown'
    }
    ```
    
    - 아직 알 수 없는 값이기 때문에 사용할 수 없다는 에러가 뜰텐데, 사용하려면 type narrowing을 해야해.
    
    ```jsx
    function doSomething(callback: unknown) {
    	if(typeof callback == 'function') {
    		callback()
    		return
    	}
    	
    	throw new Error('callback은 함수여야 합니다.')
    }
    ```
    
    - 위와 같이 typeof를 사용해서 unknown에 접근은 하되, 해당 unknown 값이 원하는 타입일 때만 의도대로 작동하도록 수정하는거야.
    - 예상 못한 타입을 받아들일 수도 있고, 사용하는 쪽에서도 안전하게 쓸 수 있어.
    
    ```jsx
    type what1 = string & number // never
    type what2 = ('hello' | 'hi') & 'react
    ```
    
    - bottom type으로 never가 있어. 어떠한 타입도 들어올 수 없다는 거야. 코드 상으로 존재가 불가능한 타입을 나타낼 때 사용해.
    
    ```jsx
    // string이 키지만 ... Record 공부하기
    ```
    
    - **타입가드를 적극 활용해.**
        - 조건문과 함께 사용하면 타입을 효과적으로 좁힐 수 있어.
    
    ```jsx
    // UnAuthorizedError를 위한 타입 가드 조건문
    if (e instanceof UnAuthorizedError) {
    	// do something ...
    }
    
    // UnExpectedError를 위한 타입 가드 조건문
    if (e instanceof UnExpectedError) {
    	// do something ...
    }
    ```
    
    - **instanceof**는 지정한 인스턴스가 특정 클래스의 인스턴스인지 확인할 수 있는 연산자야.
    - 에러에 따라 원하는 처리 내용을 추가할 수 있어.
    
    ```jsx
    function logging(value: string | undefined) {
    	if(typeof value === 'string') {
    		console.log(value)
    	}
    	
    	if(typeof value === 'undefined') {
    		// nothing to do
    		return
    	}
    }
    ```
    
    - **typeof** 연산자는 특정 요소에 대해 자료형을 확인하는데 사용돼.
    
    ```jsx
    interface Student {
    	age: number
    	score: number
    }
    
    interface Teacher {
    	name: string
    }
    
    function doSchool(person: Student | Teacher) {
    	if('age' in person) {
    		person.age // person은 Student
    		person.score
    	}
    	
    	if('name' in person) {
    		person.name // person은 Teacher
    	}
    }
    ```
    
    - in은 property in object로 사용돼. 주로 어떤 객체에 키가 존재하는지 확인하는 용도야.
    
    - **제네릭(generic)**은 함수나 클래스 내부에서 단일 타입이 아닌 다양한 타입에 대응할 수 있도록 도와주는 도구야.
    
    ```jsx
    function getFirstAndLast(list: unknown[]) {
    	return [list[0], list[list.length -1]]
    }
    
    const [first, last] = getFirstAndLast([1,2,3,4,5])
    
    // 공부하기 ... 
    ```
    
    - **인덱스 시그니처(index signature)**