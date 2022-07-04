const { Post } = require('../models');

const postData = [
    {
        title: 'New Iphone',
        name: 'Vice',
        created_at: '07/03/2022',
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;