import express, {Request, Response, NextFunction} from 'express';
import {asyncHandler} from '../utils/asyncErrorHandler';
import AppDataSource from '../data-source';
import {Activity} from '../entities/activityEntity';
import {And, Raw} from 'typeorm';

export const getActivities = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  const result = await AppDataSource.manager.findOneBy(Activity, {id: id});
  res.status(200).send({result: result});
});

export const getActivitiesInWeek = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  console.log(startDate, endDate);

  const result = await AppDataSource.manager.find(Activity, {
    where: {
      activity_time_start: Raw((alias) => `${alias} >= :start`, {start: startDate}),
      activity_time_end: Raw((alias) => `${alias}   <= :end`, {end: endDate}),
    },
  });

  res.status(200).send({result: result});
});

export const postActivities = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const defaultEndTime: Date = new Date(body.activity_time_start);
  defaultEndTime.setDate(defaultEndTime.getDate() + 1);

  let isoDate = defaultEndTime.toISOString();

  isoDate = isoDate.split('T')[0] + 'T00:00:00.000Z';

  console.log(body.activity_time_start, defaultEndTime);

  const results = await AppDataSource.manager.find(Activity, {
    where: {
      activity_time_start: And(
        Raw((alias) => `${alias} >= :start`, {start: body.activity_time_start}),
        Raw((alias) => `${alias}   <= :end`, {end: defaultEndTime})
      ),
    },
  });

  const currDateStart = new Date(body.activity_time_start);
  const currDateEnd = new Date(body.activity_time_end);

  const conflictingRecords = results.filter((activity) => {
    const activityDateStart = new Date(activity.activity_time_start);
    const activitDateEnd = new Date(activity.activity_time_end);

    if (currDateStart >= activityDateStart && activityDateStart <= activitDateEnd) return true;
    else if (currDateEnd >= activityDateStart && currDateEnd <= activitDateEnd) return true;
    else return false;
  });

  if (conflictingRecords.length != 0) {
    res.status(400).send('Conflict: Added activity shares same time with existing activity');
  } else {
    const activityRepository = AppDataSource.getRepository(Activity);
    await activityRepository.insert(body);

    res.status(200).send('Success');
  }
});
