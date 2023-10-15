import {Router} from 'express';
import { incomeController } from '../controllers/incomeController';

const router = Router();

router.get('/:id', (req,res) => {
    incomeController.get(req,res);
});
router.get('/', (req,res) => {
    incomeController.getAll(req,res);
});
router.post('/', (req,res) => {
    incomeController.create(req,res);
});
router.put('/:id', (req,res) => {
    incomeController.update(req,res);
});
router.delete('/:id', (req,res) => {
    incomeController.delete(req,res);
});

export const incomeRouter = router;