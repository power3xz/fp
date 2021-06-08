const { reduce, get, curry, curryr, map, filter } = require("./_");
const users = [
  { id: 1, name: "ID", age: 11 },
  {
    id: 2,
    name: "asdf",
    age: 22,
  },
  {
    id: 3,
    name: "good",
    age: 234,
  },
  {
    id: 4,
    name: "11",
    age: 1,
  },
];

const temp_users = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}

console.log(temp_users);

const names = [];
for (let i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name);
}
console.log(names);

console.log(
  "filter ",
  filter(users, (u) => u.age >= 30)
);

console.log(
  "filter2 ",
  filter(users, (u) => u.age < 30)
);

console.log(
  "map1 ",
  map(
    filter(users, (u) => u.age < 30),
    curryr(get)("name")
  )
);

// 외부 다형성 array vs array-like object
// 내부 다형성 각 루프별 실행하는 함수를 자유롭게 사용가능

// 자바스크립트 filter, map과의 차이
// 자바스크립트의 filter, map은 배열 클래스에 정의되어 있는 메서드이다
// 배열에만 내장되어있고 형태가 비슷한 객체에는 내장되어있지 않다.
// 작성한 map, filter는 형태만 맞으면 배열인지 배열과비슷한 객체인지 상관없이 사용 가능하다.

const add = curry((a, b) => {
  return a + b;
});

const add10 = add(10);
console.log("add10: ", add10(5));

// curry -> 평가 시점을 뒤로 미룸

const sub = curryr((a, b) => {
  return a - b;
});
const sub10 = sub(10);
console.log("sub10: ", sub10(5));

console.log(
  "reduce: ",
  reduce([1, 2, 3, 4], (a, b) => a + b, 0)
);

console.log(
  "reduce: ",
  reduce([1, 2, 3, 4], (a, b) => a + b)
);
