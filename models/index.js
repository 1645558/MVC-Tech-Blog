const User = require('./user');
const Post = require('./post');

User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

module.exports = { User, Post };