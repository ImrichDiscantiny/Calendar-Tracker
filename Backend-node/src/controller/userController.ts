import express, {Router} from 'express';

import {loginUser, registerUser, resetPassword} from '../services/userService';

const userRouter = express.Router();

userRouter.route('/login').post(loginUser);

userRouter.route('/register').post(registerUser);

userRouter.route('/reset').post(resetPassword);

export default userRouter;
