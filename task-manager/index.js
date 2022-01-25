const express = require('express');

// Params Mongoose
const mongoose = require('mongoose');
require('./src/database/mongoose');
const userSchema = require('./src/schema/User');
const taskSchema = require('./src/schema/Task');
const UserModel = mongoose.model('User', userSchema);
const TaskModel = mongoose.model('Task', taskSchema);

const app = express(); 
const PORT = process.env.PORT || 3000;
app.use(express.json())



//Routes Users
app.post('/users', async (request, response) => {
    
    try {
        const user = new UserModel(request.body);
        await user.save();
        response.status(201).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
})

app.get('/users', async (request, response) => {
    try {
        const users = await UserModel.find({});
        response.status(200).send(users);
    } catch (error) {
        response.status(404).send(error);
    }
}); 


app.get('/users/:id', async (request, response) => {

    try {
        const user = await UserModel.findById(request.params.id);
        if(!user)
           return response.status(404).send({message: "Utilisateur non trouvé"});
        response.status(200).send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.patch('/users/:id', async (request, response) => {

    const updateKeys = Object.keys(request.body);
    const checkKeys = ['name', 'email', 'password', 'age']
    const isValidKeys = updateKeys.every((updateKey) => checkKeys.includes(updateKey));

    if(!isValidKeys)
        return response.status(400).send({message : "Mauvaise requête"});
    
    try {
        const user = await UserModel.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true});
        if(!user)
            return response.status(404).send({message : "Utilisateur non trouvé"});
        response.status(200).send(user);
    } catch (error) {
        response.status(500).send(error);
    }


});


app.delete('/users/:id', async (request, response) => {
    try {
        const deleted = await UserModel.findByIdAndDelete(request.params.id);
        if(!deleted)
            return response.status(404).send({message : "Utilisateur non trouvé et non supprimé"});
        response.status(200).send({deleted});
    } catch (error) {
        response.status(500).send({error});
    }

});

//Routes Tasks
app.post('/tasks', async (request, response) =>{
    
    try {
        const task = await new TaskModel(request.body);
        await task.save()
        response.status(201).send(task);
    } catch (error) {
        response.status(405).send(error);
    }
});


app.get ('/tasks', async (request, response) => {
    
    try {
        const tasks = await TaskModel.find({});
        response.status(200).send(tasks);
    } catch (error) {
        response.status(404).send(error);
    }
        
});

app.get('/tasks/:id', async (request, response)=> {

    try {
        const task = await TaskModel.findById(request.params.id);
        if(!task)
            return response.status(404).send({message: "Tâche non trouvée"});
        response.status(200).send(task);
    } catch (error) {
        response.status((500)).send(error);
    }
});

app.patch('/tasks/:id', async (request, response) => {

    const updateKeys = Object.keys(request.body);
    const checkKeys = ['description', 'completed']
    const isValidKeys = updateKeys.every((updateKey) => checkKeys.includes(updateKey));

    if(!isValidKeys)
        return response.status(400).send({message: "Mauvaise requête"});

    try {
        const task = await TaskModel.findByIdAndUpdate(request.params.id,  request.body, {new: true, runValidators:true});
        if(!task)
            return response.status(404).send({message : 'Tâche non trouvée et non Mise à jour'});
        response.status(200).send(task);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete('/tasks/:id', async (request, response) => {
    try {
        const deleted = await TaskModel.findByIdAndDelete(request.params.id);
        if(!deleted)
            return response.status(404).send({message : "Tâche non trouvée et non supprimée"});
        response.status(200).send({deleted});
    } catch (error) {
        response.status(500).send({error});
    }

});


app.listen(PORT,() => {
    console.log('Serveur sur le port : ', PORT);
});