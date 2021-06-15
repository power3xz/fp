const { keys, filter, map, curryr, get, reduce } = require("./_");
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
  { id: 5, name: "good", age: 11 },
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
//   1. min, max, min_by, max_by
const min = (data) => {
  return reduce(data, (a, b) => {
    return a < b ? a : b;
  });
};
const max = (data) => {
  return reduce(data, (a, b) => {
    return a > b ? a : b;
  });
};

const min_by = (data, iter) => {
  return reduce(data, (a, b) => {
    return iter(a) < iter(b) ? a : b;
  });
};
const max_by = (data, iter) => {
  return reduce(data, (a, b) => {
    return iter(a) > iter(b) ? a : b;
  });
};

console.log("min", min([1, 2, 35, 6, -11]));
console.log("max", max([1, 2, 3, 5, 7, 78]));
console.log("min_by", min_by([1, 2, 3, 4, 6, -11], Math.abs));
console.log("max_by1", max_by([1, 2, 3, 4, 6, -11], Math.abs));
console.log("max_by2", max_by(users, curryr(get)("age")));
//   2. group_by, push
const push = (obj, key, val) => {
  (obj[key] = obj[key] || []).push(val);
  return obj;
};
const group_by = curryr((data, iter) => {
  return reduce(
    data,
    (grouped, val) => {
      return push(grouped, iter(val), val);
    },
    {}
  );
});
console.log("group_by", group_by(curryr(get)("name"))(users));
//   3. count_by, inc
const inc = (count, key) => {
  count[key] ? count[key]++ : (count[key] = 1);
  return count;
};
const count_by = curryr((data, iter) => {
  return reduce(
    data,
    (count, val) => {
      return inc(count, iter(val));
    },
    {}
  );
});

console.log("count_by", count_by(curryr(get)("age"))(users));
