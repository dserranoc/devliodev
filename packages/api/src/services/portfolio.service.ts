import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import Portfolio, { PortfolioInput, PortfolioDocument } from '../models/portfolio.model'

const PortfolioService = {
  save: async (portfolio: PortfolioInput) => {
    const newPortfolio = new Portfolio(portfolio)
    const savedPortfolio = await newPortfolio.save()
    return savedPortfolio.toJSON()
  },
  find: async (query: FilterQuery<PortfolioDocument>, options: QueryOptions = { lean: true }) => {
    const portfolio = await Portfolio.findOne(query, {}, options)
    return portfolio
  },
  findAndUpdate: async (query: FilterQuery<PortfolioDocument>, update: UpdateQuery<PortfolioDocument>, options: QueryOptions) => {
    return await Portfolio.findOneAndUpdate(query, update, options)
  },
  delete: async (query: FilterQuery<PortfolioDocument>) => {
    return await Portfolio.deleteOne(query)
  }
}

export default PortfolioService
