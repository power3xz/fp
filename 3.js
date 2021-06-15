const { keys, filter, map, curryr, get } = require("./_");
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
const _map = curryr(map);
const _get = curryr(get);
const _filter = curryr(filter);

// 1.  수집하기 - map
//    1. values
const values = _map(identity);
console.log("values", values(users));

//    2. pluck
const pluck = (data, key) => {
  return map(data, _get(key));
};
console.log("pluck1", pluck(users, "id"));
console.log("pluck2", pluck(users, "name"));
console.log("pluck2", pluck(users, "age"));

// 2. 거르기 - filter
//    1. reject
const negate = (fn) => (val) => !fn(val);
const reject = (data, predi) => {
  return filter(data, negate(predi));
};
console.log(
  "reject",
  reject(users, (user) => user.age > 30)
);

//   2. compact
const compact = _filter(identity);
console.log("compact", compact([0, 1, 2, 3, false, null, {}, []]));

// 3. 찾아내기 - find
//    1. find 만들기
const find = (list, predi) => {
  const key = keys(list);
  for (let i = 0; i < key.length; i++) {
    const val = list[key[i]];
    if (predi(val)) return val;
  }
};

console.log(
  "find",
  find(users, (user) => user.age > 30)
);
//    2. find_index
const find_index = (list, predi) => {
  const key = keys(list);
  for (let i = 0; i < key.length; i++) {
    const val = list[key[i]];
    if (predi(val)) return i;
  }
  return -1;
};
const _find_index = curryr(find_index);
console.log("find_index", _find_index((user) => user.age === 234)(users));
//    3. some
const some = (data, predi) => {
  return find_index(data, predi || identity) != -1;
};
console.log(
  "some1",
  some([1, 2, 3, 4, 10, 20], (val) => val > 20)
);
console.log(
  "some2",
  some([1, 2, 3, 4, 10, 20], (val) => val <= 20)
);
console.log("some3", some([1, 2, 3, 4, 10, 20]));
//  4. every
const every = (data, predi) => {
  return find_index(data, negate(predi || identity)) == -1;
};
console.log(
  "every1",
  every([1, 2, 3, 4, 10, 20], (val) => val >= 20)
);
console.log(
  "every2",
  every([1, 2, 3, 4, 10, 20], (val) => val > 0)
);
console.log(
  "every3",
  every([1, 2, 3, 4, 10, 20], (val) => val < 20)
);
console.log(
  "every4",
  every([0, 1, 2, 3, 4, 10, 20], (val) => val < 20)
);

// 4. 접기 - reduce
