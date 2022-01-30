const request = require("supertest");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require("../app");
const UserModel = require('../src/schema/User');
const { ObjectId } = require("bson");


const userDefaultID = new mongoose.Types.ObjectId();
const userDefault = {
    _id: userDefaultID,
    name : 'Cassandra',
    email: 'cassandra@exemple.com',
    password:'abcdef3',
    tokens:[{
        token: jwt.sign({_id: userDefaultID}, process.env.AUTH_TOKEN)
    }]
};

beforeEach(async () => {
    await UserModel.deleteMany();
    await new UserModel(userDefault).save();
});

test("TEST-0 : Inscription d'un nouvel utilisateur", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "TEST",
      email: "test@test.com",
      password: "abcdef2",
    })
    .expect(201);
});

test("TEST-1 : connection Utilisateur", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: userDefault.email,
        password: userDefault.password,
      })
      .expect(200);
  });
  
  test("TEST-1 FAIL : connection Utilisateur", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "userDefault.email",
        password: "userDefault.password",
      })
      .expect(400);
  });

  test("TEST-2 : GET Utilisateur", async () => {
    await request(app)
      .get("/users/me")
      .set('Authorization', `Bearer ${userDefault.tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("TEST-2 FAIL : GET Utilisateur", async () => {
    await request(app)
      .get("/users/me")
      .send()
      .expect(401);
  });

  test("TEST-3 : DELETE Utilisateur", async () => {
    await request(app)
    .delete("/users/me")
    .set('Authorization', `Bearer ${userDefault.tokens[0].token}`)
    .send()
      .expect(200);
  });

  test("TEST-3 FAIL : DELETE Utilisateur", async () => {
    await request(app)
    .delete("/users/me")
    .send()
      .expect(401);
  });

  