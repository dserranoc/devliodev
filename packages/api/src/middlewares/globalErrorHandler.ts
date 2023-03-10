import { NextFunction, Request, Response } from 'express'

// WIP: This is a global error handler that will be used in the future when we have more error types
export default (err: any, _req: Request, res: Response, next: NextFunction): void => {
  try {
    throw err
  } catch (error) {
    res.status(500).send(
      {
        success: false,
        error: {
          type: 'UnhandledError',
          statusCode: 500,
          message: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.'
        }
      }
    )
  }
}
