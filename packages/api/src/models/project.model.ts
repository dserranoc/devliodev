import { Schema, model, Types } from 'mongoose'

export interface ProjectInput {
  name: string
  description: string
  image: string
  url?: string
  urlRepository?: string
  technologies: string[]
}

export interface ProjectDocument extends ProjectInput, Document {
  assignedTo: Types.ObjectId[]
  user: Types.ObjectId
}

const projectSchema = new Schema<ProjectDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  url: String,
  urlRepository: String,
  technologies: [{ type: String, required: true }],
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'Portfolio' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export default model<ProjectDocument>('Project', projectSchema)
