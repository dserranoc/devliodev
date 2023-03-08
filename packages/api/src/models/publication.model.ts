import { Schema, model, Types } from 'mongoose'

export type PublicationStatus = 'draft' | 'published'

export interface PublicationInput {
  subdomain: string
  portfolio: Types.ObjectId
  status: PublicationStatus
  template: string
}

export interface PublicationDocument extends PublicationInput, Document {
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}

const publicationSchema = new Schema<PublicationDocument>({
  subdomain: { type: String, required: true, unique: true },
  portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio' },
  status: { type: String, required: true, enum: ['draft', 'published'], default: 'draft' },
  template: { type: String, required: true }
}, { timestamps: true })

publicationSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<PublicationDocument>('Publication', publicationSchema)
