import { Schema, model, Types } from 'mongoose'
import Portfolio from './portfolio.model'
import User from './user.model'

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

projectSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

projectSchema.post('save', async function (doc, next) {
  await User.updateOne({ _id: this.user }, { $addToSet: { projects: this._id } })
  next()
})

projectSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await User.updateOne({ _id: this.user }, { $pull: { projects: this._id } })
  await Portfolio.updateMany({ _id: { $in: this.assignedTo } }, { $pull: { projects: this._id } })
  next()
})

export default model<ProjectDocument>('Project', projectSchema)
