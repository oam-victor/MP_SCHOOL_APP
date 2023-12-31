import { Class } from '../models/classes'
import { Student } from '../models/students'
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { Types } from 'mongoose'

interface classInt {
  name: number
  students: ObjectId[]
  teacher: string
}

export const classController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const class_: classInt[] = await Class.find()
      if (class_.length === 0) {
        res.status(204).json({ message: 'There are no Classes!' })
      } else {
        res.status(200).json(class_)
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const response = await Class.findById(id)
      if (response == null) {
        res.status(404).json({ message: 'Class not found!' })
      } else {
        res.status(200).json({ response, message: 'Class found!' })
      }
    } catch (err) {
      res.json(err)
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const class_: classInt = {
        name: req.body.name,
        teacher: req.body.teacher,
        students: req.body.students,
      }
      const response = await Class.create(class_)
      res.status(201).json({ response, msg: 'Class created succesfully!' })
    } catch (err) {
      res.json({ message: err })
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const class_: classInt = {
        name: req.body.name,
        teacher: req.body.teacher,
        students: req.body.students,
      }

      const id = req.params.classID
      const response = await Class.findByIdAndUpdate(id, class_)
      if (response == null) {
        res.status(404).json({ message: 'Class not found!' })
      } else {
        res.status(200).json({ message: 'Updated succesfully!' })
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.classID
      const response = await Class.findByIdAndDelete(id)
      if (response == null) {
        res.status(404).json({ message: 'Class not found!' })
      } else {
        res.status(200).json({ message: 'Deleted succesfully!' })
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  append: async (req: Request, res: Response) => {
    try {
      const studentID = new ObjectId(req.params.studentID)
      const classID = req.params.classID
      const class_ = await Class.findById(classID)
      const student = Student.findById(studentID)
      const class_object: classInt = class_.toObject()
      const student_object = (await student).toObject()

      if (class_ == null) {
        res.status(404).json({ error: 'Class not found!' })
      } else {
        /*Add student to class*/

        for (const student of class_object.students) {
          if (student.toString() === studentID.toString()) {
            res
              .status(304)
              .json({ message: 'Student ID is already in the class.' })
            return // Make sure to add this to exit the loop if a match is found
          }
        }

        class_object.students.push(new Types.ObjectId(studentID))
        const response1 = await Class.findByIdAndUpdate(classID, class_object)

        /*Add class to student*/
        student_object.class_ = Number(class_object.name)
        const response2 = await Student.findByIdAndUpdate(
          studentID,
          student_object,
        )

        if (response2 == null) {
          res
            .status(400)
            .json({ message: 'Student was not updated succesfully!' })
        } else {
          res.status(200).json({ message: 'Student was added succesfully!' })
        }
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  pop: async (req: Request, res: Response) => {
    try {
      const studentID = new Types.ObjectId(req.params.studentID)
      const classID = req.params.classID
      const class_ = await Class.findById(classID)

      if (class_ == null) {
        res.status(404).json({ message: 'Class not found!' })
      } else {
        const class_object = class_.toObject()
        const class_object_students: Types.ObjectId[] = class_object.students.filter(
          (student) => student.toString() != studentID.toString(),
        )

        class_object.students = class_object_students
        const response = await Class.findByIdAndUpdate(classID, class_object)
        if (response == null) {
          res.status(404).json({ message: 'Class not found!' })
        } else {
          res.status(200).json({ message: class_object.students })
        }
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
}