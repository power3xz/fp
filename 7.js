const _ = require("partial-js");

const square = (a) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a * a);
    }, 500);
  });
};

square(10).then(square).then(square).then(console.log);

_.go(square(10), square, square, console.log);

const list = [2, 3, 4];
new Promise((resolve) => {
  (function recur(res) {
    if (list.length === res.length) return resolve(res);
    square(list[res.length]).then((val) => {
      res.push(val);
      recur(res);
    });
  })([]);
}).then(console.log);

_.go(list, _.map(square), console.log);
