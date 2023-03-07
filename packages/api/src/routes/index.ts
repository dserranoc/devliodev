import { Router, Request, Response } from 'express'
import userRouter from './user.router'

const router = Router()

router.get('/health', (_req: Request, res: Response) => {
  res.sendStatus(200)
})

router.use('/user', userRouter)

export default router
