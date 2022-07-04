const { Post } = require('../models');

const postData = [
    {
        name: 'User1234',
        title: 'New Iphone',
        created_at: '07/03/2022',
        user_id: 1,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts();