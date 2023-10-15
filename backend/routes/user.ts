import { Router } from 'express'
import { userController } from '../controllers/userController'

const router = Router()

router.get('/:id', (req,res) => {
    userController.get(req,res);
});
router.get('/', (req,res) => {
    userController.getAll(req,res);
});
router.get('/signin', (req,res) => {
    userController.signIn(req,res);
});
router.post('/', (req,res) => {
    userController.create(req,res);
});
router.put('/:id', (req,res) => {
    userController.update(req,res);
});
router.delete('/:id', (req,res) => {
    userController.delete(req,res);
});

export const userRouter = router;
