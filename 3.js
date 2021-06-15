const { map, curryr, get } = require("./_");
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

const identity = (val) => val;

// 1.  수집하기 - map
//   1. values
const values = curryr(map)(identity);
console.log(values(users));

//   2. pluck
const pluck = (data, key) => {
  return map(data, curryr(get)(key));
};
console.log(pluck(users, "id"));
console.log(pluck(users, "name"));
console.log(pluck(users, "age"));

// 2. 거르기 - filter
//   1. reject
//   2. compact

// 3. 찾아내기 - find
//   1. find 만들기
//   2. find_index
