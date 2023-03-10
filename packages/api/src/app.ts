import express from 'express'
import router from './routes'
import globalErrorHandler from './middlewares/globalErrorHandler'

const app = express()
app.use(express.json())

app.use('/api', router)

app.use(globalErrorHandler)

export default app
