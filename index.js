const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const PORT = 4000;

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let interval;

socketIO.on('connection', (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = {
    'left' : 0,
    'right' : 0,
    'up' : 0,
    'down' : 0
  }
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});