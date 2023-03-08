import { Schema, model } from 'mongoose'

const publicationSchema = new Schema({
  subdomain: { type: String, required: true, unique: true },
  portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio' },
  status: { type: String, required: true, enum: ['draft', 'published'], default: 'draft' },
  template: { type: String, required: true }
}, { timestamps: true })

export default model('Publication', publicationSchema)
