import { Request, Response, NextFunction } from 'express'
import { StandardResponse } from '../types/types.d'
import PublicationService from '../services/publication.service'
import { CreatePublicationInput, UpdatePublicationInput } from '../schemas/publication.schema'

const publicationController = {
  create: async (req: Request<CreatePublicationInput['body']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const userId = res.locals.user.id

    const publication = await PublicationService.save({ ...req.body, user: userId })
    return res.status(201).json({
      success: true,
      content: publication
    })
  },
  get: async (req: Request<UpdatePublicationInput['params']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const publication = await PublicationService.find({ _id: req.params.publicationId })
    if (publication === null) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Publication not found'
        }
      })
    }

    return res.status(200).json({
      success: true,
      content: publication
    })
  }
}

export default publicationController