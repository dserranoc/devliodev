import { Request, Response, NextFunction } from 'express'
import { CreateUserInput, createUserSchema, DeleteUserInput, LoginUserInput, UpdateUserInput } from '../schemas/user.schema'
import UserService from '../services/user.service'
import { StandardResponse } from '../types/types.d'
import jwt from '../utils/jwt'

const userController = {
  register: async (req: Request<{}, {}, CreateUserInput['body']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    createUserSchema.parse(req)
    const user = await UserService.save(req.body)
    res.status(201).json({
      success: true,
      content: user
    })
  },
  auth: async (req: Request<{}, {}, LoginUserInput['body']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const user = await UserService.validateCredentials(req.body)

    if (user === false) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid credentials'
        }
      })
    }

    const accessToken = jwt.sign({ email: user.email, id: user._id })

    return res.status(200).json({
      success: true,
      content: {
        accessToken
      }
    })
  },
  update: async (req: Request<UpdateUserInput['body']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const userId = res.locals.user._id

    if (userId === null) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid credentials'
        }
      })
    }

    const user = await UserService.findAndUpdate({ _id: userId }, req.body, { new: true })

    return res.status(200).json({ success: true, content: user })
  },
  delete: async (req: Request<DeleteUserInput['params']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const userId = res.locals.user._id

    if (userId === null) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid credentials'
        }
      })
    }

    await UserService.delete({ _id: userId })

    return res.status(200).json({ success: true, message: 'User deleted successfully!' })
  }
}

export default userController
