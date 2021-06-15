const get = (obj, key) => {
  return obj == null ? undefined : obj[key];
};

module.exports.get = get;

module.exports.filter = function filter(list, predi) {
  const new_list = [];
  each(list, (v) => {
    if (predi(v)) {
      new_list.push(v);
    }
  });
  return new_list;
};

module.exports.map = function map(list, mapper) {
  const new_list = [];
  each(list, (v) => {
    new_list.push(mapper(v));
  });
  return new_list;
};

function each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

module.exports.each = each;

const curry = (fn) => (a, b) => {
  return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
};
module.exports.curry = curry;

const curryr = (fn) => (a, b) => {
  return arguments.length == 2 ? fn(a, b) : (b) => fn(b, a);
};

module.exports.curryr = curryr;

const slice = Array.prototype.slice;
const rest = (list, num) => {
  return slice.call(list, num || 1);
};

const reduce = (list, iter, memo) => {
  if (!memo) {
    memo = list[0];
    list = rest(list);
  }
  each(list, (v) => {
    memo = iter(memo, v);
  });
  return memo;
};
module.exports.reduce = reduce;

const keys = (obj) => Object.keys(obj);

module.exports.keys = keys;
