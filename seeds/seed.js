const sequelize = require('../config/connection');
const seedGallery = require('./galleryData');
const seedBlogs = require('./blogData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedGallery();

  await seedBlogs();

  process.exit(0);
};

seedAll();
