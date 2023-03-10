import { Request, Response, NextFunction } from 'express'
import jwt from '../utils/jwt'

const getUserFromReq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorization = req.headers.authorization
  if (authorization === undefined || authorization === null) {
    return next()
  }

  const accessToken = authorization.replace(/^Bearer\s/, '')

  if (accessToken === undefined || accessToken === null || accessToken === '') {
    return next()
  }

  const { decoded, expired } = jwt.verify(accessToken)

  if (decoded !== null && expired === false) {
    res.locals.user = decoded
    return next()
  }

  return next()
}
export default getUserFromReq
