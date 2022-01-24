const express = require('express');

// Params Mongoose
const mongoose = require('mongoose');
require('./src/database/mongoose');
const userSchema = require('./src/schema/User');
const taskSchema = require('./src/schema/Task');
const UserModel = mongoose.model('User', userSchema);
const taskModel = mongoose.model('Task', taskSchema);

const app = express(); 
const PORT = process.env.PORT || 3000;
app.use(express.json())



//Routes Users
app.post('/users', (request, response) => {
    
    const user = new UserModel(request.body);
    user.save()
    .then((result) => response.status(201).send(result))
    .catch((error) => response.status(400).send(error))
})

app.get('/users', (request, response) => {
    UserModel.find({})
    .then((result) => response.status(200).send(result))
    .catch((error) => response.status(404).send(error));
}); 


app.get('/users/:id', (request, response) => {
    UserModel.findById(request.params.id)
    .then((result) => {
        if(!result)
           return response.status(404).send({message: "Utilisateur non trouvé"})
        response.status(200).send(result);
    }).catch((error) => response.status(500).send(error))
});

//Routes Tasks
app.post('/tasks', (request, response) =>{
    
    const task = new taskModel(request.body);

    task.save()
    .then((result) => response.status(201).send(result))
    .catch((error) => response.status(405).send(error))

});


app.get ('/tasks', (request, response) => {
        taskModel.find({})
        .then((result) => response.status(200).send(result))
        .catch((error) => response.status(404).send(error));
});

app.get('/tasks/:id', (request, response)=> {
    taskModel.findById(request.params.id)
    .then((result) => {
        if(!result)
            return response.status(404).send({message: "Tâche non trouvé"});
        response.status(200).send(result);
    })
    .catch((error) => response.status((500)).send(error))
});

app.delete('/tasks/:id', async (request, response) => {
    taskModel.deleteOne({_id: request.params.id})
    .then((result) => {
        console.log(result);
        return taskModel.count({completed: false});
    })
    .then((count) => { response.status(200).send({count : count})})
    .catch((error) => { response.status(500).send({error})});
});


app.listen(PORT,() => {
    console.log('Serveur sur le port : ', PORT);
});