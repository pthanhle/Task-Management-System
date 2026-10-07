import { Router } from 'express'
import * as authController from '../../controllers/auth.controller'
import { authenticate } from '../../middlewares/auth.middleware'
import { validate } from '../../middlewares/validate.middleware'
import { registerSchema, loginSchema } from '../../schemas/auth.schema'

const router = Router()

router.post('/register', validate(registerSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)
router.post('/refresh-token', authController.refreshToken)
router.post('/logout', authenticate, authController.logout)
router.get('/me', authenticate, authController.me)

export default router
