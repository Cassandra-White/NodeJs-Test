const express = require("express");
const router = new express.Router();
const UserModel = require("../schema/User");
const auth = require('../middleware/auth');


//Routes Users
router.post("/users", async (request, response) => {
  try {
    const user = new UserModel(request.body);
    await user.save();
    const token = await user.generateTokenAuth();
    response.status(201).send({user, token});
  } catch (error) {
    response.status(400).send(error);
  }
});

router.post('/users/login', async (request, response) => {

    try {
        const user = await UserModel.findByCredentials(request.body.email, request.body.password);
        const token = await user.generateTokenAuth();
        response.send({user, token});
    } catch (error) {
        response.status(500).send({error});
    }

});

router.post('/users/logout', auth, async (request, response) => {
    try {
        request.user.tokens = request.user.tokens.filter((token) => {
            return token.token !== request.token;
        });
        console.log("OK");
        await request.user.save();
        response.status(200).send({message : "Déconnecté"});
    } catch (error) {
        response.status(501).send(error);
    }
});

router.post('/users/logoutall', auth, async (request, response) =>{
    try {
        request.user.tokens = [];
        await request.user.save();
        response.status(201).send({message: 'Déconnecté de tous les appareils'});
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get("/users/me",auth, async (request, response) => {

    //  response.status(200).send(request.user);

      try {
        //   console.log(request.user);
        console.log("Post reussi");
    // const users = await UserModel.find({});
    response.status(200).send(request.user);
  } catch (error) {
    response.status(404).send(error);
  }
});

router.get("/users/:id", async (request, response) => {
  try {
    const user = await UserModel.findById(request.params.id);
    if (!user)
      return response.status(404).send({ message: "Utilisateur non trouvé" });
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.patch("/users/:id", async (request, response) => {
  const updateKeys = Object.keys(request.body);
  const checkKeys = ["name", "email", "password", "age"];
  const isValidKeys = updateKeys.every((updateKey) =>
    checkKeys.includes(updateKey)
  );

  if (!isValidKeys)
    return response.status(400).send({ message: "Mauvaise requête" });

  try {
      const user = await UserModel.findById(request.params.id);
      updateKeys.forEach((updateKey) => user[updateKey] = request.body[updateKey]);
      await user.save();
    if (!user)
      return response.status(404).send({ message: "Utilisateur non trouvé" });
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/users/:id", async (request, response) => {
  try {
    const deleted = await UserModel.findByIdAndDelete(request.params.id);
    if (!deleted)
      return response
        .status(404)
        .send({ message: "Utilisateur non trouvé et non supprimé" });
    response.status(200).send({ deleted });
  } catch (error) {
    response.status(500).send({ error });
  }
});

module.exports = router;
