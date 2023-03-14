import { Router } from 'express'
import asyncHandler from '../middlewares/asyncHandler'
import portfolioController from '../controllers/portfolio.controller'
import requireAuth from '../middlewares/requireAuth'
import getUserFromReq from '../middlewares/getUserFromReq'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', [getUserFromReq, requireAuth], asyncHandler(portfolioController.create))

export default router
