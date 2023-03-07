import mongoose from 'mongoose'
import config from 'config'
import log from './utils/logger'

const mongoUrl = config.get<string>('mongoUrl')

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUrl)
  } catch (err) {
    log.error(err)
    process.exit(1)
  }
}

const close = async (): Promise<void> => {
  await mongoose.connection.close()
}

export default { connect, close }
