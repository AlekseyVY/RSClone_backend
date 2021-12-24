import { createConnection } from 'typeorm';
import app from '../app';

createConnection().then(async () => {
  app.listen(process.env.PORT || 5000, () => process.stdout.write(`App is running on http://localhost:${process.env.PORT}`));
});
