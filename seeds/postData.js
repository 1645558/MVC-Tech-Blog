const { Post } = require('../models');

const postData = [
    {
        title: 'New Iphone',
        name: 'Vice',
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;