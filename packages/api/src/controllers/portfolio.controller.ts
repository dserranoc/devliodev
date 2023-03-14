import { Request, Response, NextFunction } from 'express'
import { StandardResponse } from '../types/types.d'
import PortfolioService from '../services/portfolio.service'
import { CreatePortfolioInput, UpdatePortfolioInput } from '../schemas/portfolio.schema'

const portfolioController = {
  create: async (req: Request<CreatePortfolioInput['body']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const userId = res.locals.user.id

    const portfolio = await PortfolioService.save({ ...req.body, user: userId })
    return res.status(201).json({
      success: true,
      content: portfolio
    })
  },
  get: async (req: Request<UpdatePortfolioInput['params']>, res: Response<StandardResponse, {}>, _next: NextFunction) => {
    const portfolio = await PortfolioService.find({ _id: req.params.portfolioId })
    if (portfolio === null) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Portfolio not found'
        }
      })
    }

    return res.status(200).json({
      success: true,
      content: portfolio
    })
  }
}

export default portfolioController
