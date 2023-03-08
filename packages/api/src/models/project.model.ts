import { Schema, model } from 'mongoose'
const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  url: String,
  urlRepository: String,
  technologies: [{ type: String, required: true }],
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'Portfolio' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export default model('Project', projectSchema)
