import express, {Request, Response, NextFunction} from 'express';
import {asyncHandler} from '../utils/asyncErrorHandler';
import {And, Raw} from 'typeorm';
import {User, newUserDTO} from '../entities/userEntity';
import AppDataSource from '../data-source';
import {validate} from 'class-validator';

export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const newUser: newUserDTO = new newUserDTO();
  newUser.whole_name = req.body.whole_name;
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.email = req.body.email;

  await validate(newUser).then((errors) => {
    if (errors.length > 0) {
      res.status(400).send(errors);
      return next();
    } else {
      console.log('validation succeed');
    }
  });

  const existingUser = await AppDataSource.manager.findOneBy(User, {email: newUser.email});

  if (existingUser !== null) {
    res.status(400).send('Conflict: User already exists');
    return next();
  }

  try {
    await AppDataSource.manager.insert(User, newUser);
    res.status(200).send('Ok');
  } catch (error: any) {
    console.log(error);
    res.status(400).send('Conflict: Wrong record');
    return next();
  }
});

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {});

export const resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {});
