const seedPosts = require("./postData");
const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedComments = require('./commentData')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPosts();

  await seedUsers();

  await seedComments();

  process.exit(0);
};

seedAll();
