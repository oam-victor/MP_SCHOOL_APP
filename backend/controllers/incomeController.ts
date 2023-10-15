import { Income } from "../models/income";
import { Request, Response } from "express";

export const incomeController = {
    create: async (req: Request, res: Response) => {
        try {
            const income = {
                name:   req.body.name,
                type:   req.body.type,
                cost:   req.body.cost,
                paid_on:req.body.paid_on
            }
      
            const response = await Income.create(income)
            res.status(201).json({ response, msg: 'Serviço criado com sucesso!' })
          } catch (err) {
            res.json({ message: err })
          }
      },
      getAll: async (req: Request, res: Response) => {
        try {
          const response = await Income.find()
          if (response.length === 0) {
            res.status(204).json({ message: 'There are no incomes!' })
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
          const response = await Income.findById(id)
          if (response == null) {
            res.status(404).json({ message: 'Income not found!' })
          } else {
            res.status(200).json(response)
          }
        } catch (err) {
          res.json({ message: err })
        }
      },
      update: async (req: Request, res: Response) => {
        try {
            const income = {
                name:   req.body.name,
                type:   req.body.type,
                cost:   req.body.cost,
                paid_on:req.body.paid_on
            }
      
            const id = req.params.id
            const response = await Income.findByIdAndUpdate(id, income)
      
            if (response == null) {
              res.status(404).json({ message: 'Income not found!' })
            } else {
              res.status(200).json({ message: 'Income was updated succesfully!' })
            }
          } catch (err) {
            res.json(err)
          }
      },
      delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const response = await Income.findByIdAndDelete(id)
            if (response == null) {
              res.status(404).json({ message: 'Income not found' })
            } else {
              res.status(200).json({ id, message: 'Income deleted succesfully' })
            }
          } catch (err) {
            res.json({ message: err })
          }
      }
}