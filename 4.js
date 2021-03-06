const _ = require("partial-js");
// 지연 평가를 시작 시키고 유지 시키는(이어가는) 함수

// 소팅의 경우에는 지연평가가 가능한지?

// 1. map
// 2. filter, reject
{
  // 엄격 평가
  let fi = 0;
  let mi = 0;
  _.go(
    _.range(100),
    _.map((val) => {
      ++mi;
      return val * val;
    }),
    _.filter((val) => {
      ++fi;
      return val % 2;
    }),
    _.take(5),
    console.log
  );
  console.log(fi, "fi");
  console.log(mi, "mi");
}
{
  // 지연 평가
  let fi = 0;
  let mi = 0;
  _.go(
    _.range(100),
    L.map((val) => {
      ++mi;
      return val * val;
    }),
    L.filter((val) => {
      ++fi;
      return val % 2;
    }),
    L.take(5),
    console.log
  );
  console.log(fi, "fi");
  console.log(mi, "mi");
}

// 끝을 내는 함수
// 1. take
// 2. some, every, find
