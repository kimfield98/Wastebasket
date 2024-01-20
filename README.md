- **타입스크립트가 뭔데?**
    - 기본 자바스크립트 문법에 타입을 더한거야.
    
    ```jsx
    function test(a,b) {
    	if(typeof a!== 'number' || typeof b!== 'number') {
    		throw new Error('a와 b 모두 숫자여야 합니다.')
    	}
    	return a / b
    }
    
    test('안녕하세요', '하이') 
    // Uncaught Error: a와 b 모두 숫자여야 합니다.
    ```
    
    - 위 코드처럼 일일이 타입 관련 에러 처리를 해주는 것은 참 번거로워.
    
    ```jsx
    function test(a: number, b:number) {
    	return a / b
    }
    
    // tsc로 이 코드를 자바스크립트로 트랜스파일하면 다음 에러 발생
    // Argument of type 'string' is not assignable to
    // parameter of type 'number'.
    // 이 코드는 타입 문제가 해결되기 전까지 쓸 수 없다.
    test('안녕하세요', '하이')
    ```
    
    - 변수에 타입을 지정해서 number만 할당할  수 있도록 해두면, 굳이 런타임까지 가지 않더라도 코드를 빌드하는 시점에 미리 확인할 수 있지.