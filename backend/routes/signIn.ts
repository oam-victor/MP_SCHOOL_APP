import { Router } from 'express'
import { userController } from '../controllers/userController'

const router = Router()

router.post('/', (req,res) => {
    userController.signIn(req,res);
});

export const userRouterSignIn = router;
