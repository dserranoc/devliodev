import { object, string, TypeOf } from 'zod'

const payload = {
  body: object({
    subdomain: string({ required_error: 'Subdomain is required' }),
    portfolio: string({ required_error: 'Portfolio is required' }),
    status: string({ required_error: 'Status is required' }),
    template: string()
  })
}

const params = {
  params: object({
    publicationId: string({
      required_error: 'publicationId is required'
    })
  })
}

export const createPublicationSchema = object({
  ...payload
})

export const updatePublicationSchema = object({
  ...payload,
  ...params
})

export const deletePublicationSchema = object({
  ...params
})

export const getPublicationSchema = object({
  ...params
})

export type CreatePublicationInput = TypeOf<typeof createPublicationSchema>
export type UpdatePublicationInput = TypeOf<typeof updatePublicationSchema>
export type ReadPublicationInput = TypeOf<typeof getPublicationSchema>
export type DeletePublicationInput = TypeOf<typeof deletePublicationSchema>
