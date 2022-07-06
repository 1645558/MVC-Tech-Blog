const { Post } = require("../models");

const postData = [
  {
    title: "New Iphone",
    post_text: "wowza",
    user_id: 1
  },
  {
    title: "Awesome",
    post_text: "Yes",
    user_id: 2
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
