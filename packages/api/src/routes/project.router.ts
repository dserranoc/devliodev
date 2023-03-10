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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:projectId', [getUserFromReq, requireAuth], asyncHandler(projectController.update))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete('/:projectId', [getUserFromReq, requireAuth], asyncHandler(projectController.delete))

export default router
