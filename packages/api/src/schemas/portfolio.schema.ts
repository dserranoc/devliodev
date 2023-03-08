import { object, string, TypeOf, array } from 'zod'

const payload = {
  body: object({
    name: string({ required_error: 'Name is required' }),
    projects: array(string())
  })
}

const params = {
  params: object({
    portfolioId: string({
      required_error: 'portfolioId is required'
    })
  })
}

export const createPortfolioSchema = object({
  ...payload
})

export const updatePortfolioSchema = object({
  ...payload,
  ...params
})

export const deletePortfolioSchema = object({
  ...params
})

export const getPortfolioSchema = object({
  ...params
})

export type CreatePortfolioInput = TypeOf<typeof createPortfolioSchema>
export type UpdatePortfolioInput = TypeOf<typeof updatePortfolioSchema>
export type ReadPortfolioInput = TypeOf<typeof getPortfolioSchema>
export type DeletePortfolioInput = TypeOf<typeof deletePortfolioSchema>
