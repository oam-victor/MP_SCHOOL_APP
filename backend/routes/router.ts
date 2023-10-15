import {Router} from 'express';
import { studentRouter } from './student';
import { userRouter } from './user';
import { userRouterSignIn } from './signIn';
import { employeeRouter } from './employees';
import { classRouter } from './classes';
import { expenseRouter } from './expenses';
import { incomeRouter } from './income';

const router = Router();
router.use('/students', studentRouter);
router.use('/user', userRouter);
router.use('/signin', userRouterSignIn);
router.use('/employees', employeeRouter);
router.use('/class', classRouter);
router.use('/expense', expenseRouter);
router.use('/income', incomeRouter);

export default router;