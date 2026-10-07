import { Response } from 'express'
import { AuthRequest } from '../types'
import * as authService from '../services/auth.service'
import { sendSuccess, sendError } from '../utils/apiResponse.util'

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const user = await authService.registerUser(req.body)
    sendSuccess(res, user, 'Registration successful', 201)
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Registration failed', 400)
  }
}

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const result = await authService.loginUser(req.body)
    sendSuccess(res, result, 'Login successful')
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Login failed', 401)
  }
}

export const refreshToken = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      sendError(res, 'Refresh token required', 400)
      return
    }
    const result = await authService.refreshUserToken(refreshToken)
    sendSuccess(res, result)
  } catch {
    sendError(res, 'Invalid refresh token', 401)
  }
}

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken } = req.body
    await authService.logoutUser(req.userId!, refreshToken)
    sendSuccess(res, null, 'Logout successful')
  } catch {
    sendError(res, 'Logout failed', 400)
  }
}

export const me = async (req: AuthRequest, res: Response) => {
  try {
    const user = await authService.getMe(req.userId!)
    sendSuccess(res, user)
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Failed to get user', 404)
  }
}
