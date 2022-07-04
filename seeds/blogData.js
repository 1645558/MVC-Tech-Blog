const { Blog } = require('../models');

const blogData = [
    {
        name: 'User1234',
        title: 'New Iphone',
        created_at: '07/03/2022',
    },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;