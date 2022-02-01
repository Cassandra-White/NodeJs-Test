const http = require("http");
const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const Filter = require("bad-words");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
//DEFINITION DES PATH POUR CONFIG EXPRESS
const publicPath = path.join(__dirname, "./public");

const {
  generateMessage,
  generateMessageLocation,
} = require("./src/utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
} = require("./src/utils/users");

app.use(express.static(publicPath));

let count = 0;

io.on("connection", (socket) => {
  socket.on("join", ({ userName, roomName }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      userName: userName,
      roomName: roomName,
    });

    if (error) return callback(error);

    socket.join(user.roomName);
    socket.emit(
      "message",
      generateMessage({ message: "Bienvenue sur le chat", userName: `Admin` })
    );
    socket.broadcast
      .to(user.roomName)
      .emit(
        "message",
        generateMessage({
          message: `${user.userName}, à rejoint la salle`,
          userName: `Admin`,
        })
      );

    io.to(user.roomName).emit("roomData", {
      roomName: user.roomName,
      users: getUserInRoom(user.roomName),
    });

    callback();
  });

  // console.log('Connection sur le chat');

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (!user) return callback("Utilisateur inconue");

    const filter = new Filter();

    if (filter.isProfane(message))
      return callback("Non délivré. Gros mot non accepté");
    io.to(user.roomName).emit(
      "message",
      generateMessage({ message, userName: user.userName })
    );
    callback();
  });

  socket.on("sendLocation", (location, callback) => {
    const user = getUser(socket.id);

    if (!user) return callback("Utilisateur inconue");

    io.to(user.roomName).emit(
      "locationMessage",
      generateMessageLocation({
        url: `https://www.google.fr/maps/@${location.latitude},${location.longitude}`,
        userName: user.userName,
      })
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.roomName).emit(
        "message",
        generateMessage({
          message: `${user.userName}, s'est déconnecté`,
          userName: user.userName,
        })
      );

      io.to(user.roomName).emit("roomData", {
        roomName: user.roomName,
        users: getUserInRoom(user.roomName),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log("Serveur lancé sur le port :", PORT);
});
