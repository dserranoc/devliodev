import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  portfolios: [{ type: Schema.Types.ObjectId, ref: 'Portfolio' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  publications: [{ type: Schema.Types.ObjectId, ref: 'Publication' }],
  skills: [{ type: String }],
  avatar: { type: String },
  bio: { type: String },
  socials: [{ type: String }],
  verified: { type: Boolean, required: true, default: false }
}, { timestamps: true })

export default model('User', userSchema)
