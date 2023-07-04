import { User } from "../models/user";
import { Request, Response } from "express";

export const userController = {
    create: async (req: Request, res: Response) => {
        try {
            const user = {
                name:   req.body.name,
                position:   req.body.position,
            }
      
            const response = await User.create(user)
            res.status(201).json({ response, msg: 'Serviço criado com sucesso!' })
          } catch (err) {
            res.json({ message: err })
          }
      },
      getAll: async (req: Request, res: Response) => {
        try {
          const response = await User.find()
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
          const response = await User.findById(id)
          if (response == null) {
            res.status(404).json({ message: 'User not found!' })
          } else {
            res.status(200).json(response)
          }
        } catch (err) {
          res.json({ message: err })
        }
      },
      update: async (req: Request, res: Response) => {
        try {
            const user = {
                name:   req.body.name,
                position:   req.body.position,
            }
      
            const id = req.params.id
            const response = await User.findByIdAndUpdate(id, user)
      
            if (response == null) {
              res.status(404).json({ message: 'User not found!' })
            } else {
              res.status(200).json({ message: 'User was updated succesfully!' })
            }
          } catch (err) {
            res.json(err)
          }
      },
      delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const response = await User.findByIdAndDelete(id)
            if (response == null) {
              res.status(404).json({ message: 'User not found' })
            } else {
              res.status(200).json({ id, message: 'User deleted succesfully' })
            }
          } catch (err) {
            res.json({ message: err })
          }
      }
}