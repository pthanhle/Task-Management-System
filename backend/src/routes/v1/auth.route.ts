import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import * as authController from '../../controllers/auth.controller'
import { authenticate } from '../../middlewares/auth.middleware'
import { validate } from '../../middlewares/validate.middleware'
import { registerSchema, loginSchema } from '../../schemas/auth.schema'

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: 'Too many requests, please try again after 15 minutes', statusCode: 429 },
  standardHeaders: true,
  legacyHeaders: false,
})

const router = Router()

router.post('/register', authLimiter, validate(registerSchema), authController.register)
router.post('/login', authLimiter, validate(loginSchema), authController.login)
router.post('/refresh-token', authController.refreshToken)
router.post('/logout', authenticate, authController.logout)
router.post('/logout-all', authenticate, authController.logoutAll)
router.get('/me', authenticate, authController.me)

export default router
