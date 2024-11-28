const request = require("supertest");
const app = require("../app");
const { describe, expect, test } = require("@jest/globals");
const { sequelize, User } = require("../models");

let users = [
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
  await sequelize.queryInterface.bulkInsert("Users", users);
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("Login(Admin)", () => {
  //a. berhasil login
  describe("Success Login", () => {
    test("Berhasil Login", async () => {
      const user = {
        email: "tangsaky@mail.com",
      };
      const res = await request(app).post("/login").send(user);
      console.log(res.body, "llllll");
      
      // expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  //Failed
  describe("Failure Login", () => {
    //b. email tidak diberikan / tidak diinput
    test("email tidak diberikan / tidak diinput", async () => {
      const user = {};
      const res = await request(app).post("/login").send(user);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Email is required");
    });

    //c. email diberikan invalid / tidak terdaftar
    test("email diberikan invalid / tidak terdaftar", async () => {
      let user = {
        email: "mima@mail.com",
      };
      const res = await request(app).post("/login").send(user);

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Email is required");
    });
  });
});
