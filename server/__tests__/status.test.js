const request = require("supertest");
const app = require("../app");
const { describe, expect, test } = require("@jest/globals");
const { sequelize, Status, User } = require("../models");
const { signToken } = require("../helpers/jwt");

const status = [
  {
    name: "To Do",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "In Progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let user = [
  {
    username: "tangsa",
    email: "tangsaky@mail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "nara",
    email: "naravt@mail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

beforeAll(async () => {
    await sequelize.queryInterface.bulkInsert("Users", user);
  await sequelize.queryInterface.bulkInsert("Statuses", status);

});

afterAll(async () => {
  Status.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});
