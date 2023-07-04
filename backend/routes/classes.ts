import {Router} from 'express';
import { classController } from '../controllers/classController';

const router = Router();

router.put('/:classID/append/:studentID', (req,res)=>{
    classController.append(req,res);
});
router.put('/:classID/pop/:studentID', (req,res)=>{
    classController.pop(req,res);
});
router.put('/:classID', (req,res)=>{
    classController.update(req,res);
});
router.post('/', (req,res)=>{
    classController.create(req,res);
});
router.get('/', (req,res)=>{
    classController.getAll(req,res);
});
router.get('/:id', (req,res)=>{
    classController.get(req,res);
});
router.delete('/:classID', (req,res)=>{
    classController.delete(req,res);
});

export const classRouter = router;