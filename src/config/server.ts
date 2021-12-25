import { createConnection } from 'typeorm';
import app from '../app';
import User from '../entity/user';

createConnection({
  type: 'mongodb',
  url: process.env.DB_URI,
  synchronize: true,
  logging: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  database: 'rsclonedb',
  entities: [
    User,
  ],
}).then(async () => {
  app.listen(process.env.PORT || 5000, () => process.stdout.write(`App is running on http://localhost:${process.env.PORT}`));
});
