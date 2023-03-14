import { Request, Response, NextFunction } from 'express'
import { StandardResponse } from '../types/types.d'
import PublicationService from '../services/publication.service'
import { CreatePublicationInput } from '../schemas/publication.schema'

const publicationController = {
  create: async (req: Request<CreatePublicationInput['body']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const userId = res.locals.user.id

    const publication = await PublicationService.save({ ...req.body, user: userId })
    return res.status(201).json({
      success: true,
      content: publication
    })
  }
}

export default publicationController
