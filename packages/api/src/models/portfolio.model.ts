import { Schema, model, Types } from 'mongoose'

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

export default model<PortfolioDocument>('Portfolio', portfolioSchema)
