import { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/apiResponse.util'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack)
  sendError(res, 'Internal server error', 500)
}
