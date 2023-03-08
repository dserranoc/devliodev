import { Schema, model } from 'mongoose'

const portfolioSchema = new Schema({
  name: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  publications: [{ type: Schema.Types.ObjectId, ref: 'Publication' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export default model('Portfolio', portfolioSchema)
