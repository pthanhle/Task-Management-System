import mongoose from 'mongoose'
import { TaskModel } from '../models/Task.model'

export const getDashboardStats = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId)
  const sevenDaysLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const [statusStats, priorityStats, upcomingTasks, total] = await Promise.all([
    TaskModel.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    TaskModel.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]),
    TaskModel.find({
      userId,
      dueDate: { $gte: new Date(), $lte: sevenDaysLater },
      status: { $ne: 'DONE' },
    })
      .sort({ dueDate: 1 })
      .limit(10)
      .select('title status priority dueDate'),
    TaskModel.countDocuments({ userId }),
  ])

  const byStatus = statusStats.reduce<Record<string, number>>(
    (acc, item) => ({ ...acc, [item._id]: item.count }),
    {}
  )

  const byPriority = priorityStats.reduce<Record<string, number>>(
    (acc, item) => ({ ...acc, [item._id]: item.count }),
    {}
  )

  return {
    total,
    todo: byStatus['TODO'] || 0,
    inProgress: byStatus['IN_PROGRESS'] || 0,
    done: byStatus['DONE'] || 0,
    byPriority: {
      low: byPriority['LOW'] || 0,
      medium: byPriority['MEDIUM'] || 0,
      high: byPriority['HIGH'] || 0,
      urgent: byPriority['URGENT'] || 0,
    },
    upcomingTasks,
  }
}
