import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", {
      body: data,
      from: socket.id,
    });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log('Server is listening on port', PORT));