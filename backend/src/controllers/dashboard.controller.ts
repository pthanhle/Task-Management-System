import { Response } from 'express'
import { Request } from 'express'
import * as dashboardService from '../services/dashboard.service'
import { sendSuccess, sendError } from '../utils/apiResponse.util'

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await dashboardService.getDashboardStats(req.userId!)
    sendSuccess(res, stats)
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Failed to get stats', 400)
  }
}
