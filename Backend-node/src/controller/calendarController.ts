import express, {Router} from 'express';

import {getActivities, getActivitiesInWeek, postActivities} from '../services/calendarService';

const calendarRouter = express.Router();

calendarRouter.get('/:startDate/:endDate', getActivitiesInWeek);

calendarRouter.route('/').post(postActivities);

calendarRouter.route('/:id').get(getActivities).post(postActivities).put(getActivities).delete(getActivities);

export default calendarRouter;
