import config from 'config'
import app from './app'
import db from './db'

const PORT = config.get<number>('port')

db.connect().then(() => {
  console.log('Connected to database')
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
