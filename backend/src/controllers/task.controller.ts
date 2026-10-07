import { Response } from 'express'
import { AuthRequest } from '../types'
import * as taskService from '../services/task.service'
import { sendSuccess, sendError } from '../utils/apiResponse.util'
import { GetTasksQuery } from '../schemas/task.schema'

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const result = await taskService.getTasks(req.userId!, req.query as unknown as GetTasksQuery)
    sendSuccess(res, result)
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Failed to get tasks', 400)
  }
}

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.userId!)
    sendSuccess(res, task)
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Task not found', 404)
  }
}

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await taskService.createTask(req.userId!, req.body)
    sendSuccess(res, task, 'Task created', 201)
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Failed to create task', 400)
  }
}

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.userId!, req.body)
    sendSuccess(res, task, 'Task updated')
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Failed to update task', 400)
  }
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    await taskService.deleteTask(req.params.id, req.userId!)
    sendSuccess(res, null, 'Task deleted')
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Failed to delete task', 404)
  }
}

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const task = await taskService.updateTaskStatus(
      req.params.id,
      req.userId!,
      req.body.status
    )
    sendSuccess(res, task, 'Status updated')
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Failed to update status', 404)
  }
}

export const reorderTasks = async (req: AuthRequest, res: Response) => {
  try {
    await taskService.reorderTasks(req.userId!, req.body.taskOrders)
    sendSuccess(res, null, 'Tasks reordered')
  } catch (err) {
    sendError(res, err instanceof Error ? err.message : 'Failed to reorder tasks', 400)
  }
}
