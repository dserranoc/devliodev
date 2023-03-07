import config from 'config'
import app from './app'
import db from './db'
import log from './utils/logger'

const PORT = config.get<number>('port')

db.connect().then(() => {
  log.info('Connected to database')
  app.listen(PORT, () => {
    log.info(`Server listening on port ${PORT}`)
  })
}).catch((err) => {
  log.error(err)
  process.exit(1)
})
