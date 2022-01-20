import { createConnection } from 'typeorm';
import server, { io } from '../app';
import User from '../entity/user';
import Character from '../entity/character';
import {hp, IHp, IPlayer, players} from '../types/socket.types';



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
  io.on('connection', (socket) => {
    players[socket.id] = {
      rotation: 0,
      x: 225,
      y: 1355,
      playerId: socket.id,
      firing: false,
    };
    hp[socket.id] = {
      hp: 100, playerId: socket.id, id: socket.id
    };

    socket.emit('currentPlayers', players);
    socket.broadcast.emit('newPlayer', players[socket.id]);
    socket.on('disconnect', () => {
      delete players[socket.id];
      io.emit('discon', socket.id);
    });

    socket.on('playerMovement', (movementData: IPlayer) => {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      players[socket.id].rotation = movementData.rotation;
      socket.broadcast.emit('playerMoved', players[socket.id]);
    });

    socket.on('damaged', (hpData: IHp) => {
      hp[socket.id].hp = hpData.hp;
      hp[socket.id].id = hpData.id;
      socket.broadcast.emit('damaged', hp[socket.id]);
    });

    socket.on('firing', (fireData: { status: boolean }) => {
      players[socket.id].firing = fireData.status;
      socket.broadcast.emit('firing', players[socket.id]);
    });
  });
  server.listen(process.env.PORT || 5000, () => process.stdout.write(`App is running on http://localhost:${process.env.PORT}`));
});
