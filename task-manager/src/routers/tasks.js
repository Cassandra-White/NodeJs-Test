const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const TaskModel = require("../schema/Task");

//Routes Tasks

router.post("/tasks", auth, async (request, response) => {
  try {
    // const task = await new TaskModel(request.body);
    const task = await new TaskModel({
      ...request.body,
      owner: request.user._id,
    });

    await task.save();
    response.status(201).send(task);
  } catch (error) {
    response.status(405).send(error);
  }
});

router.get("/tasks", auth, async (request, response) => {
  try {
      //Filtre Simple
    // const tasks = await TaskModel.find({owner: request.user._id});
    //Filtre alternatif, avec populate()
    await request.user.populate('tasks');


    response.status(200).send(request.user.tasks);
  } catch (error) {
    response.status(404).send(error);
  }
});

router.get("/tasks/:id", auth, async (request, response) => {
  try {
    const task = await TaskModel.findOne({_id : request.params.id, owner: request.user._id});

    if (!task)
      return response.status(404).send({ message: "Tâche non trouvée" });
    response.status(200).send(task);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.patch("/tasks/:id", async (request, response) => {
  const updateKeys = Object.keys(request.body);
  const checkKeys = ["description", "completed"];
  const isValidKeys = updateKeys.every((updateKey) =>
    checkKeys.includes(updateKey)
  );

  if (!isValidKeys)
    return response.status(400).send({ message: "Mauvaise requête" });

  try {
    const task = await TaskModel.findById(request.params.id);
    updateKeys.forEach(
      (updateKey) => (task[updateKey] = request.body[updateKey])
    );
    if (!task)
      return response
        .status(404)
        .send({ message: "Tâche non trouvée et non Mise à jour" });
    response.status(200).send(task);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/tasks/:id", async (request, response) => {
  try {
    const deleted = await TaskModel.findByIdAndDelete(request.params.id);
    if (!deleted)
      return response
        .status(404)
        .send({ message: "Tâche non trouvée et non supprimée" });
    response.status(200).send({ deleted });
  } catch (error) {
    response.status(500).send({ error });
  }
});

module.exports = router;
