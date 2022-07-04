const { Gallery } = require('../models');

const galleryData = [
    {
        name: 'Vice',
        title: 'New Iphone',
        created_at: '07/03/2022',
    },
];

const seedGallery = () => Gallery.bulkCreate(galleryData);

module.exports = seedGallery;