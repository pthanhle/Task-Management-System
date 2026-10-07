import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types'
import { verifyAccessToken } from '../utils/jwt.util'
import { sendError } from '../utils/apiResponse.util'

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    sendError(res, 'Unauthorized', 401)
    return
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = verifyAccessToken(token)
    req.userId = decoded.userId
    next()
  } catch {
    sendError(res, 'Token invalid or expired', 401)
  }
}
