import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { sendError } from '../utils/apiResponse.util'

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    if (!result.success) {
      const message = result.error.issues.map(i => i.message).join(', ')
      sendError(res, message, 422)
      return
    }
    next()
  }
}
