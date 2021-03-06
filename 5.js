const _ = require("partial-js");

const users = [
  {
    id: 101,
    name: "id",
  },
  {
    id: 102,
    name: "bj",
  },
  {
    id: 103,
    name: "pj",
  },
  {
    id: 104,
    name: "ha",
  },
  {
    id: 105,
    name: "je",
  },
  {
    id: 106,
    name: "ji",
  },
];

const posts = [
  {
    id: 201,
    body: "내용1",
    user_id: 101,
  },
  {
    id: 202,
    body: "내용2",
    user_id: 102,
  },
  {
    id: 203,
    body: "내용3",
    user_id: 103,
  },
  {
    id: 204,
    body: "내용4",
    user_id: 102,
  },
  {
    id: 205,
    body: "내용5",
    user_id: 101,
  },
];

const comments = [
  { id: 301, body: "댓글1", user_id: 105, post_id: 201 },
  { id: 302, body: "댓글2", user_id: 104, post_id: 201 },
  { id: 303, body: "댓글3", user_id: 105, post_id: 202 },
  { id: 304, body: "댓글4", user_id: 105, post_id: 203 },
  { id: 305, body: "댓글5", user_id: 106, post_id: 203 },
  { id: 306, body: "댓글6", user_id: 102, post_id: 204 },
  { id: 307, body: "댓글7", user_id: 102, post_id: 205 },
  { id: 308, body: "댓글8", user_id: 103, post_id: 204 },
  { id: 309, body: "댓글9", user_id: 103, post_id: 202 },
  { id: 310, body: "댓글10", user_id: 105, post_id: 201 },
];
const posts_by = (attr) => _.where(posts, attr);
const comments_by_posts = _.pipe(_.pluck("id"), (post_ids) => {
  return _.filter(comments, (comment) => {
    return _.contains(post_ids, comment.post_id);
  });
});

// 1. 특정인의 posts의 모든 comments 거르기
const f1 = _.pipe(posts_by, comments_by_posts);
console.log(f1({ user_id: 101 }));

// 2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기

const comments_to_user_names = _.map((comment) => {
  return _.find(users, (user) => {
    return user.id === comment.user_id;
  }).name;
});

const f2 = _.pipe(f1, comments_to_user_names, _.uniq);

console.log(f2({ user_id: 101 }));

// 3. 특정인의 posts에 comments를 단 친구들 카운트 정보
const f3 = _.pipe(f1, comments_to_user_names, _.count_by);

console.log(f3({ user_id: 101 }));

// 4. 특정인이 comments를 단 posts 거르기
_.go(
  _.where(comments, { user_id: 105 }),
  _.pluck("post_id"),
  _.uniq,
  (post_ids) => {
    return _.filter(posts, (post) => {
      return _.contains(post_ids, post.id);
    });
  },
  console.log
);

// 5. users + posts + comments (index_by와 group_by로 효율 높이기)
const users2 = _.index_by(users, "id");

const comments2 = _.go(
  comments,
  _.map((comment) => {
    return {
      ...comment,
      user: users2[comment.user_id],
    };
  }),
  _.group_by("post_id")
);
console.log(comments2);

const posts2 = _.map(posts, (post) => {
  return {
    ...post,
    comments: comments2[post.id] || [],
    user: users2[post.user_id],
  };
});

const posts3 = _.go(
  _.map(posts2, (post) => {
    return {
      ...post,
      comments: comments2[post.id] || [],
      user: users2[post.user_id],
    };
  }),
  _.group_by("user_id")
);
console.log(posts3);

const users3 = _.map(users2, (user) => {
  return {
    ...user,
    posts: posts3[user.id] || [],
  };
});

console.log(users3);

// 5.1 특정인의 posts의 모든 comments 거르기
const user = users3[0];
console.log(user.posts, _.deep_pluck("posts.comments"));

// 5.2 특정인의 posts에 comments를 단 친구의 이름을 뽑기
_.go(
  user.posts,
  _.pluck("comments"),
  _.flatten,
  _.pluck("user"),
  _.pluck("name"),
  _.uniq,
  console.log
);

_.go(user, _.deep_pluck("posts.comments.user.name"), _.uniq, console.log);

// 5.3 특정인의 posts에 comments를 단 친구들 카운트 정보
_.go(
  user.posts,
  _.pluck("comments"),
  _.flatten,
  _.pluck("user"),
  _.pluck("name"),
  _.count_by,
  console.log
);

_.go(user, _.deep_pluck("posts.comments.user.name"), _.count_by, console.log);

// 5.4 특정인이 comment를 단 posts 거르기
console.log(
  _.filter(posts2, (post) => {
    return _.find(post.comments, (comment) => comment.user_id === 105);
  })
);
