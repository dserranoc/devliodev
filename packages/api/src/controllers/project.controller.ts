import { Request, Response, NextFunction } from 'express'
import { StandardResponse } from '../types/types.d'
import ProjectService from '../services/project.service'
import { CreateProjectInput, UpdateProjectInput } from '../schemas/project.schema'

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
    return res.status(201).json({
      success: true,
      content: project
    })
  },
  get: async (req: Request<UpdateProjectInput['params']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const project = await ProjectService.find({ _id: req.params.projectId })
    if (project === null) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Project not found'
        }
      })
    }

    return res.status(200).json({
      success: true,
      content: project
    })
  },

  update: async (req: Request<UpdateProjectInput['params'] & UpdateProjectInput['body']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const userId = res.locals.user.id

    const update = req.body

    const project = await ProjectService.find({ _id: req.params.projectId })

    if (project === null) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Project not found'
        }
      })
    }
    if (project.user.toString() !== userId) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Unauthorized'
        }
      })
    }

    const updatedProject = await ProjectService.findAndUpdate({ _id: req.params.projectId }, update, {
      new: true
    })

    return res.status(200).json({
      success: true,
      content: updatedProject
    })
  }
}

export default projectController
