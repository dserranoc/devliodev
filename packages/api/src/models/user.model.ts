import { Schema, model, Types } from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserInput {
  email: string
  password: string
  name: string
  surname: string
}

export interface UserDocument extends UserInput, Document {
  portfolios: Types.ObjectId[]
  projects: Types.ObjectId[]
  publications: Types.ObjectId[]
  skills?: string[]
  avatar?: string
  bio?: string
  socials?: string[]
  verified: boolean
  createdAt: Date
  updatedAt: Date
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const userSchema = new Schema<UserDocument>({
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

userSchema.pre('save', { document: true, query: false }, async function (next) {
  if (this.isModified('password')) {
    const SALTFACTOR = config.get<number>('saltFactor')
    this.password = await bcrypt.hash(this.password, SALTFACTOR)
  }
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument
  return await bcrypt.compare(candidatePassword, user.password)
    .catch(() => false)
}

export default model<UserDocument>('User', userSchema)
