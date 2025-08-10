import express, {Express, Request, Response, Application} from 'express';
import calendarRouter from './controller/calendarController';
import userRouter from './controller/userController';

const app = express();

app.use(express.json());

app.use('/activity', calendarRouter);
app.use('/me', userRouter);

export default app;
