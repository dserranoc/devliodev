import { Router, Request, Response } from 'express'
import userRouter from './user.router'
import projectRouter from './project.router'
import portfolioRouter from './portfolio.router'
import publicationRouter from './publication.router'

const router = Router()

router.get('/health', (_req: Request, res: Response) => {
  res.sendStatus(200)
})

router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/portfolio', portfolioRouter)
router.use('/publication', publicationRouter)

export default router
