import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import User, { UserInput, UserDocument } from '../models/user.model'

const UserService = {
  save: async (user: UserInput) => {
    const newUser = new User(user)
    const savedUser = await newUser.save()
    return savedUser.toJSON()
  },
  find: async (query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) => {
    const user = await User.findOne(query, {}, options)
    return user
  },
  findAndUpdate: async (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) => {
    return await User.findOneAndUpdate(query, update, options)
  },
  delete: async (query: FilterQuery<UserDocument>) => {
    return await User.deleteOne(query)
  }
}

export default UserService
