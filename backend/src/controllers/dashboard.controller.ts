import { Response } from 'express'
import { AuthRequest } from '../types'
import * as dashboardService from '../services/dashboard.service'
import { sendSuccess, sendError } from '../utils/apiResponse.util'

export const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await dashboardService.getDashboardStats(req.userId!)
    sendSuccess(res, stats)
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Failed to get stats', 400)
  }
}
