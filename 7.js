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
