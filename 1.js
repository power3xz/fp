// 부수 효과가 없다
// 동일인자 동일 반환
// 호출시간에 영향이 없음

// 순수함수
function add(a, b) {
  return a + b;
}

console.log(add(10, 5));

let c = 10;
function add2(a, b) {
  return a + b + c;
}

function add3(a, b) {
  c = b;
  return a + b;
}

var obj1 = { val: 10 };
function add4(obj, b) {
  obj.val += b;
}

console.log(obj1.val);
add4(obj1, 20);
console.log(obj1.val);
function add5(obj, b) {
  return {
    val: obj.val + b,
  };
}

// 일급함수 -> 함수 호출의 인자로 사용될수있다(매개변수), 함수의 결과값으로 사용될수 있다.(리턴값), 대입연산을 통해 변수가 가리키는 대상으로 지정될수 있다(변수에 할당)
var f1 = (a) => a * a;

var f3 = (f) => {
  return f();
};
