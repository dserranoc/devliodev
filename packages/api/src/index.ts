import express, { Request, Response } from 'express'
import config from 'config'

const app = express()

const PORT = config.get<number>('port')

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  const baseUrl = config.get<string>('baseUrl')
  console.log(`Server is listening on ${baseUrl}:${PORT}`)
})
