const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const userData = [
  {
    username: "funguy",
    email: "funguy@me.com",
    password: "password1234",
  },
  {
    username: "fred",
    email: "fred@me.com",
    password: "password1234",
  },
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;
