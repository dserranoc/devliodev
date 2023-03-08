import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import Publication, { PublicationInput, PublicationDocument } from '../models/publication.model'

const PublicationService = {
  save: async (publication: PublicationInput) => {
    const newPublication = new Publication(publication)
    const savedPublication = await newPublication.save()
    return savedPublication.toJSON()
  },
  find: async (query: FilterQuery<PublicationDocument>, options: QueryOptions = { lean: true }) => {
    const publication = await Publication.findOne(query, {}, options)
    return publication
  },
  findAndUpdate: async (query: FilterQuery<PublicationDocument>, update: UpdateQuery<PublicationDocument>, options: QueryOptions) => {
    return await Publication.findOneAndUpdate(query, update, options)
  },
  delete: async (query: FilterQuery<PublicationDocument>) => {
    return await Publication.deleteOne(query)
  }
}

export default PublicationService
