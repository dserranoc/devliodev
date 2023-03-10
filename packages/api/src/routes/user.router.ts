import { Router } from 'express'
import userController from '../controllers/user.controller'
import asyncHandler from '../middlewares/asyncHandler'

const router = Router()

// we need to disable the rule because we are using a middleware to catch errors in the controller

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', asyncHandler(userController.register))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/auth', asyncHandler(userController.auth))

export default router
