import { Schema, model, Types } from 'mongoose'
import User from './user.model'
import Portfolio from './portfolio.model'

export type PublicationStatus = 'draft' | 'published'

export interface PublicationInput {
  subdomain: string
  portfolio: Types.ObjectId
  status: PublicationStatus
  template: string
}

export interface PublicationDocument extends PublicationInput, Document {
  user: Types.ObjectId
}

const publicationSchema = new Schema<PublicationDocument>({
  subdomain: { type: String, required: true, unique: true },
  portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio' },
  status: { type: String, required: true, enum: ['draft', 'published'], default: 'draft' },
  template: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

publicationSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

publicationSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
  const publication = await this.model.findOne(this.getQuery())
  await Portfolio.updateOne({ _id: publication.portfolio }, { $pull: { assignedTo: publication._id } })
  await User.updateOne({ _id: publication.user }, { $pull: { publications: publication._id } })
  next()
})

publicationSchema.pre('save', { document: true, query: false }, async function (next) {
  if (!this.isNew && this.isModified('portfolio')) {
    await Portfolio.updateOne({ _id: this.portfolio }, { $pull: { publications: this._id } })
  }
  next()
})

publicationSchema.post('save', { document: true, query: false }, async function (doc, next) {
  await User.updateOne({ _id: doc.user }, { $addToSet: { publications: doc._id } })
  await Portfolio.updateOne({ _id: doc.portfolio }, { $addToSet: { assignedTo: doc._id } })
  next()
})

export default model<PublicationDocument>('Publication', publicationSchema)
