import { Employee } from '../models/employees'
import { Request, Response } from 'express'

export const exployeeController = {
  create: async (req: Request, res: Response) => {
    const employee = {
      name: req.body.name,
      email: req.body.email,
      position: req.body.position,
      department: req.body.department,
      salary: req.body.salary,
      hire_date: req.body.hire_date,
      manager: req.body.manager,
      phone: req.body,
    }
    try {
      const response = await Employee.create(employee)
      res
        .status(201)
        .json({ response, message: 'Employee created successfully' })
    } catch (err) {
      res.json({ message: err })
    }
  },
  update: async (req: Request, res: Response) => {
    const id = req.params.id
    const employee = {
      name: req.body.name,
      email: req.body.email,
      position: req.body.position,
      department: req.body.department,
      salary: req.body.salary,
      hire_date: req.body.hire_date,
      manager: req.body.manager,
      phone: req.body,
    }

    try {
      const response = await Employee.findByIdAndUpdate(id, employee)
      res.json({ response, message: 'Employee updated sucessfully' })
    } catch (err) {
      res.json({ message: err })
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const response = await Employee.findByIdAndDelete(id)
      res.json({response, message: 'Employee deleted succesfully!' })
    } catch (err) {
      res.json({ message: err })
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const response = await Employee.find()
      if(response.length === 0){
        res.status(204).json({ message: 'There are no Employees!' })
      }else{
        res.status(200).json(response)
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const response = await Employee.findById(id)
      if (!response) {
        res.json({ message: 'Employee not found!' })
      } else {
        res.json({response,  message: 'Employee deleted succesfully!' })
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
}
