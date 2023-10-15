import { Expense } from '../models/expenses'
import { Request, Response } from 'express'

export const expenseController = {
  create: async (req: Request, res: Response) => {
    try {
        const expense = {
            name:   req.body.name,
            type:   req.body.type,
            cost:   req.body.cost,
            paid_on:req.body.paid_on
        }
  
        const response = await Expense.create(expense)
        res.status(201).json({ response, msg: 'Serviço criado com sucesso!' })
      } catch (err) {
        res.json({ message: err })
      }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const response = await Expense.find()
      if (response.length === 0) {
        res.status(204).json({ message: 'There are no expenses!' })
      } else {
        res.status(200).json(response)
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const response = await Expense.findById(id)
      if (response == null) {
        res.status(404).json({ message: 'Expense not found!' })
      } else {
        res.status(200).json(response)
      }
    } catch (err) {
      res.json({ message: err })
    }
  },
  update: async (req: Request, res: Response) => {
    try {
        const expense = {
            name:   req.body.name,
            type:   req.body.type,
            cost:   req.body.cost,
            paid_on:req.body.paid_on
        }
  
        const id = req.params.id
        const response = await Expense.findByIdAndUpdate(id, expense)
  
        if (response == null) {
          res.status(404).json({ message: 'Expense not found!' })
        } else {
          res.status(200).json({ message: 'Expense was updated succesfully!' })
        }
      } catch (err) {
        res.json(err)
      }
  },
  delete: async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const response = await Expense.findByIdAndDelete(id)
        if (response == null) {
          res.status(404).json({ message: 'Expense not found' })
        } else {
          res.status(200).json({ id, message: 'Expense deleted succesfully' })
        }
      } catch (err) {
        res.json({ message: err })
      }
  }
}
