import { createConnection } from 'typeorm';
import server, { io } from '../app';
import User from '../entity/user';
import Character from '../entity/character';

const players: any = {};

createConnection({
  type: 'mongodb',
  url: process.env.DB_URI,
  synchronize: true,
  logging: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  database: process.env.DB_NAME,
  entities: [
    User, Character,
  ],
}).then(async () => {
  io.on('connection', (socket: any) => {
    players[socket.id] = {
      rotation: 0,
      x: 440,
      y: 440,
      playerId: socket.id,
    };
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);
    // console.log('a user connected');
    socket.on('disconnect', () => {
      // remove this player from our players object
      delete players[socket.id];
      // emit a message to all players to remove this player
      io.emit('discon', socket.id);
      // console.log('user disconnected');
    });

    socket.on('playerMovement', (movementData: any) => {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      players[socket.id].rotation = movementData.rotation;
      // emit a message to all players about the player that moved
      socket.broadcast.emit('playerMoved', players[socket.id]);
    });
  });
  server.listen(process.env.PORT || 5000, () => process.stdout.write(`App is running on http://localhost:${process.env.PORT}`));
});
