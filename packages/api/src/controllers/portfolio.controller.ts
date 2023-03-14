import { Request, Response, NextFunction } from 'express'
import { StandardResponse } from '../types/types.d'
import PortfolioService from '../services/portfolio.service'
import { CreatePortfolioInput } from '../schemas/portfolio.schema'

const portfolioController = {
  create: async (req: Request<CreatePortfolioInput['body']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const userId = res.locals.user.id

    const portfolio = await PortfolioService.save({ ...req.body, user: userId })
    return res.status(201).json({
      success: true,
      content: portfolio
    })
  }
}

export default portfolioController
