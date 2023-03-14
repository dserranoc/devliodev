import { Schema, model, Types } from 'mongoose'
import Project from './project.model'
import User from './user.model'

export interface PortfolioInput {
  name: string
  projects: Types.ObjectId[]
}

export interface PortfolioDocument extends PortfolioInput, Document {
  assignedTo: Types.ObjectId[]
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}

const portfolioSchema = new Schema<PortfolioDocument>({
  name: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'Publication' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

portfolioSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

portfolioSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  if (this.assignedTo.length > 0) {
    const err = new Error('Cannot delete a published portfolio. Please unpublish it first.')
    return next(err)
  }

  await User.updateOne({ _id: this.user }, { $pull: { portfolios: this._id } })
  await Project.updateMany({ _id: { $in: this.projects } }, { $pull: { assignedTo: this._id } })
  next()
})

portfolioSchema.pre('save', { document: true, query: false }, async function (next) {
  if (!this.isNew && this.isModified('projects')) {
    await Project.updateMany({ _id: { $in: this.projects } }, { $pull: { assignedTo: this._id } })
  }
  next()
})

portfolioSchema.post('save', { document: true, query: false }, async function (doc, next) {
  await User.updateOne({ _id: doc.user }, { $addToSet: { portfolios: doc._id } })
  await Project.updateMany({ _id: { $in: doc.projects } }, { $addToSet: { assignedTo: doc._id } })
  next()
})

export default model<PortfolioDocument>('Portfolio', portfolioSchema)
