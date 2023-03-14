import { Router } from 'express'
import projectController from '../controllers/project.controller'
import asyncHandler from '../middlewares/asyncHandler'
import requireAuth from '../middlewares/requireAuth'
import getUserFromReq from '../middlewares/getUserFromReq'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', [getUserFromReq, requireAuth], asyncHandler(projectController.create))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:projectId', asyncHandler(projectController.get))

export default router
