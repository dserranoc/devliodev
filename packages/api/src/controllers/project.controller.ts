import { Request, Response, NextFunction } from 'express'
import { StandardResponse } from '../types/types.d'
import ProjectService from '../services/project.service'
import { CreateProjectInput } from '../schemas/project.schema'

const projectController = {
  create: async (req: Request<CreateProjectInput['body']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const userId = res.locals.user.id

    if (userId === null) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid credentials'
        }
      })
    }

    const project = await ProjectService.save({ ...req.body, user: userId })
    res.status(201).json({
      success: true,
      content: project
    })
  }
}

export default projectController
