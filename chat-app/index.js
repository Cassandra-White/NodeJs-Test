const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');



const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
//DEFINITION DES PATH POUR CONFIG EXPRESS
const publicPath = path.join(__dirname, "./public");


const { generateMessage, generateMessageLocation } = require('./src/utils/messages');

app.use(express.static(publicPath));

let count = 0;

io.on('connection', (socket) => {


    socket.on('join', ({ userName, roomName})=> {
        socket.join(roomName);
        socket.emit('message', generateMessage("Bienvenue sur le chat"));
        socket.broadcast.to(roomName).emit('message', generateMessage(`${userName}, à rejoint la salle`));
    });



    // console.log('Connection sur le chat');

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if(filter.isProfane(message))
            return callback('Non délivré. Gros mot non accepté');
        io.emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateMessageLocation(`https://www.google.fr/maps/@${location.latitude},${location.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage("Un utilisateur s'est déconnecté"));
    });

})

server.listen(PORT, () => {
    console.log('Serveur lancé sur le port :', PORT);
})