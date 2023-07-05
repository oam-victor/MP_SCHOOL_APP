import {Router} from 'express';
import { studentController } from '../controllers/studentController';

const router = Router();

router.post('/', (req,res)=>{
    studentController.create(req,res);
});

router.get('/', (req,res)=>{
    studentController.getAll(req,res);
});

router.get('/:id', (req,res)=>{
    studentController.get(req,res);
})

router.delete('/:id', (req,res)=>{
    studentController.delete(req,res);
})

router.put('/:id', (req,res)=>{
    studentController.update(req,res);
})

export const studentRouter = router;