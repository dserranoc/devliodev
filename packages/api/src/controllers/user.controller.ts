import { Request, Response, NextFunction } from 'express'
import { CreateUserInput, createUserSchema } from '../schemas/user.schema'
import UserService from '../services/user.service'

const userController = {
  register: async (req: Request<{}, {}, CreateUserInput['body']>, res: Response, _next: NextFunction) => {
    await createUserSchema.parse(req)
    const user = await UserService.save(req.body)
    res.status(201).json(user)
  }
}

export default userController
