import { User } from '../models/user'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt';

interface User_ {
  uid?: string
  name?: string
  email: string
  photoURL?: string
  password?: string
  permission?: string
}

function generateRandomPassword(length: number) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export const userController = {
  signIn: async(req: Request, res: Response) => {
    const user: User_ = {
      email: req.body.email,
      password: req.body.password,
    }
    try {
      const email = user.email
      const result:User_[]  = await User.find({ email })

      if (result) {
        const response = await bcrypt.compare(user.password, result[0].password)
        if(response){
          res.status(200).json({  status: "SUCCESS",
                      message: "Sign in successful",
                      data: result
          })
        }else{
          res.status(401).json({  status: "FAILED",
                      message: "Invalid credentials!",
          })
        }        
      } 
    }catch(err){
      res.status(401).json({ message: err })
    }
  },
  create: async (req: Request, res: Response) => {
    const user: User_ = {
      name: req.body.name,
      uid: req.body.uid,
      email: req.body.email,
      photoURL: req.body.photoURL,
      password: req.body.password || generateRandomPassword(10),
      permission: 'read'
    }
    
    try {
      const email = user.email
      const result = await User.findOne({ email })

      if (result) {
        console.log(result)
        res.status(401).json({ message: 'This email is already registered' })
        
      } else {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        const response = await User.create(user)
        res.status(201).json({ response, msg: 'Serviço criado com sucesso!' })
      }
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
      const user: User_ = {
        name: req.body.name,
        uid: req.body.uid,
        email: req.body.email,
        photoURL: req.body.photoURL,
        permission: req.body.permission
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
  },
}
