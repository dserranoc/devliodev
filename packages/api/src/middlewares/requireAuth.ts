import { Request, Response, NextFunction } from 'express'

const requireAuth = async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
  const user = res.locals.user

  if (user === undefined || user === null) {
    return res.sendStatus(403)
  }

  return next()
}

export default requireAuth
