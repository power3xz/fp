const _ = require("partial-js");
const products = [
  {
    is_selected: true,
    name: "반팔티",
    price: 10000,
    sizes: [
      {
        name: "L",
        quantity: 2,
        price: 0,
      },
      {
        name: "XL",
        quantity: 3,
        price: 0,
      },
      {
        name: "2XL",
        quantity: 2,
        price: 2000,
      },
    ],
  },
  {
    is_selected: true,
    name: "후드티",
    price: 21000,
    sizes: [
      {
        name: "L",
        quantity: 3,
        price: -1000,
      },
      {
        name: "2XL",
        quantity: 1,
        price: 2000,
      },
    ],
  },
  {
    is_selected: false,
    name: "맨투맨",
    price: 16000,
    sizes: [
      {
        name: "L",
        quantity: 4,
        price: 0,
      },
    ],
  },
];

const total_quantity = _.reduce((tq, product) => {
  return _.reduce(
    product.sizes,
    (tq, size) => {
      return tq + size.quantity;
    },
    tq
  );
}, 0);

// 1. 모든 수량
_.go(products, total_quantity, console.log);

// 2. 선택 총수량
_.go(
  products,
  _.filter((product) => product.is_selected),
  total_quantity,
  console.log
);

// 3. 모든 가격
const total_price = _.reduce((sum, product) => {
  return _.reduce(
    product.sizes,
    (sum, size) => {
      return sum + (size.price + product.price) * size.quantity;
    },
    sum
  );
}, 0);
_.go(products, total_price, console.log);

// 4. 선택 된 총가격
_.go(
  products,
  _.filter((product) => product.is_selected),
  total_price,
  console.log
);
