import { createConnection } from 'typeorm';
import server, { io } from '../app';
import User from '../entity/user';
import Character from '../entity/character';
import { IPlayer, IZombie } from '../types/socket.types';

const players: {[index: string]: IPlayer} = {};
const zombies: IZombie = {
  x: 0,
  y: 0,
  rotation: 0,
};

let hp = 150;

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
      x: 225,
      y: 1355,
      playerId: socket.id,
      firing: false,
    };
    socket.emit('currentPlayers', players);
    socket.broadcast.emit('newPlayer', players[socket.id]);
    socket.on('disconnect', () => {
      delete players[socket.id];
      io.emit('discon', socket.id);
    });
    socket.on('playerMovement', (movementData: any) => {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      players[socket.id].rotation = movementData.rotation;
      socket.broadcast.emit('playerMoved', players[socket.id]);
    });

    socket.on('enemyInteraction', (enemyData: any) => {
      zombies.x = enemyData.x;
      zombies.y = enemyData.y;
      zombies.rotation = enemyData.rotation;
    });

    socket.on('enemyHp', (value: any) => {
      hp = value.value;
    });

    socket.on('firing', (fireData: any) => {
      players[socket.id].firing = fireData.status;
      socket.broadcast.emit('firing', players[socket.id]);
    });
    setTimeout(() => {
      socket.broadcast.emit('enemyInteraction', zombies);
      socket.emit('enemyInteraction', zombies);
      socket.broadcast.emit('enemyHp', hp);
    }, 10);
  });
  server.listen(process.env.PORT || 5000, () => process.stdout.write(`App is running on http://localhost:${process.env.PORT}`));
});
