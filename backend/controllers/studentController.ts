import { Student } from '../models/students'
import { Request, Response } from 'express'

interface Data {
  name: string
  email: string
  address: string
  age: number
  phone_number: number
  class_: number
  grades: number[]
  profile: string
}

export const studentController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const students = await Student.find()
      if (students.length === 0) {
        res.status(204).json({ message: 'There are no students!' })
      } else {
        res.status(200).json(students)
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const student = await Student.findById(id)
      if (student == null) {
        res.status(404).json({ message: 'Student not found!' })
      } else {
        res.status(200).json(student)
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const student:Data = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        age: req.body.age,
        phone_number: req.body.phone_number,
        class_: req.body.class_,
        grades: req.body.grades,
        profile: req.body.profile
      }

      const response = await Student.create(student)
      res.status(201).json({ response, msg: 'Serviço criado com sucesso!' })
    } catch (err) {
      res.json({ message: err })
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const deletedStudent = await Student.findByIdAndDelete(id)
      if (deletedStudent == null) {
        res.status(404).json({ message: 'Student not found' })
      } else {
        res.status(200).json({ id, message: 'Student deleted succesfully' })
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const student:Data = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        profile: req.body.profile,
        age: req.body.age,
        phone_number: req.body.phone_number,
        class_: req.body.class_,
        grades: req.body.grades
      }
      const id = req.params.id
      const response = await Student.findByIdAndUpdate(id, student)

      if (response == null) {
        res.status(404).json({ message: 'Student not found!' })
      } else {
        res.status(200).json({ message: 'Student was updated succesfully!' })
      }
    } catch (err) {
      res.json(err)
    }
  },
}
