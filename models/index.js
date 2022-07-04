const User = require('./user');
const Blog = require('./blog');
const Gallery = require('./gallery');

Gallery.hasMany(Blog, {
    foreignKey: 'gallery_id',
});

Blog.belongsTo(Gallery, {
    foreignKey: 'gallery_id',
});

module.exports = { User, Blog, Gallery };