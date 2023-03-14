import { Router } from 'express'
import asyncHandler from '../middlewares/asyncHandler'
import publicationController from '../controllers/publication.controller'
import requireAuth from '../middlewares/requireAuth'
import getUserFromReq from '../middlewares/getUserFromReq'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', [getUserFromReq, requireAuth], asyncHandler(publicationController.create))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:publicationId', asyncHandler(publicationController.get))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:publicationId', [getUserFromReq, requireAuth], asyncHandler(publicationController.update))

export default router
