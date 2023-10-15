import {Router} from 'express';
import { expenseController } from '../controllers/expenseController';

const router = Router();

router.get('/:id', (req,res) => {
    expenseController.get(req,res);
});
router.get('/', (req,res) => {
    expenseController.getAll(req,res);
});
router.post('/', (req,res) => {
    expenseController.create(req,res);
});
router.put('/:id', (req,res) => {
    expenseController.update(req,res);
});
router.delete('/:id', (req,res) => {
    expenseController.delete(req,res);
});

export const expenseRouter = router;