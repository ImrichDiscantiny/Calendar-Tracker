import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {Activity} from './entities/activityEntity';
import {User} from './entities/userEntity';

import * as dotenv from 'dotenv';

dotenv.config({path: './config.env'});

const {DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV} = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT || '5432'),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: NODE_ENV === 'dev' ? true : false,
  logging: NODE_ENV === 'dev' ? false : false,
  entities: [Activity, User],
  migrations: [__dirname + '/migration/*.ts'],
  subscribers: [],
});

export default AppDataSource;
