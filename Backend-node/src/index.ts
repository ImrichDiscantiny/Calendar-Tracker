import dotenv from 'dotenv';
import app from './app';
import AppDataSource from './data-source';

import 'reflect-metadata';

dotenv.config({path: './config.env'});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error: Error) => console.log(error));
