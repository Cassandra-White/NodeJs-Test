const express = require("express");
const router = new express.Router();
const UserModel = require("../schema/User");
const auth = require("../middleware/auth");

//Routes Users
router.post("/users", async (request, response) => {
  try {
    const user = new UserModel(request.body);
    await user.save();
    const token = await user.generateTokenAuth();
    response.status(201).send({ user, token });
  } catch (error) {
    response.status(400).send(error);
  }
});

router.post("/users/login", async (request, response) => {
  try {
    const user = await UserModel.findByCredentials(
      request.body.email,
      request.body.password
    );
    const token = await user.generateTokenAuth();
    response.send({ user, token });
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post("/users/logout", auth, async (request, response) => {
  try {
    request.user.tokens = request.user.tokens.filter((token) => {
      return token.token !== request.token;
    });
    await request.user.save();
    response.status(200).send({ message: "Déconnecté" });
  } catch (error) {
    response.status(501).send(error);
  }
});

router.post("/users/logoutall", auth, async (request, response) => {
  try {
    request.user.tokens = [];
    await request.user.save();
    response.status(201).send({ message: "Déconnecté de tous les appareils" });
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/users/me", auth, async (request, response) => {
  //  response.status(200).send(request.user);

  try {
    response.status(200).send(request.user);
  } catch (error) {
    response.status(404).send(error);
  }
});

router.patch("/users/me", auth, async (request, response) => {
  const updateKeys = Object.keys(request.body);
  const checkKeys = ["name", "email", "password", "age"];
  const isValidKeys = updateKeys.every((updateKey) =>
    checkKeys.includes(updateKey)
  );

  if (!isValidKeys)
    return response.status(400).send({ message: "Mauvaise requête" });

  try {
    updateKeys.forEach(
      (updateKey) => (request.user[updateKey] = request.body[updateKey])
    );
    await request.user.save();
    response.status(200).send(request.user);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/users/me", auth, async (request, response) => {
  try {
    await request.user.remove();
    response
      .status(200)
      .send({ message: "Utilisateur supprimé", user: request.user });
  } catch (error) {
    response.status(500).send({ error });
  }
});

module.exports = router;
