import { Router } from 'express'
import { exployeeController } from '../controllers/employeeController';

const router = Router()

router.post('/', (req,res) => {
    exployeeController.create(req,res);
});
router.put('/:id', (req,res) => {
    exployeeController.update(req,res);
});
router.delete('/:id', (req,res) => {
    exployeeController.delete(req,res);
});
router.get('/', (req,res) => {
    exployeeController.getAll(req,res);
});
router.get('/:id', (req,res) => {
    exployeeController.get(req,res);
});

export const employeeRouter = router;
