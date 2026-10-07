import { TaskModel, ITask } from '../models/Task.model'
import { CreateTaskInput, UpdateTaskInput, GetTasksQuery } from '../schemas/task.schema'
import { PaginatedResult } from '../types'

export const getTasks = async (
  userId: string,
  query: GetTasksQuery
): Promise<PaginatedResult<ITask>> => {
  const { status, priority, search, page, limit } = query
  const filter: Record<string, unknown> = { userId }

  if (status) filter.status = status
  if (priority) filter.priority = priority
  if (search) filter.title = { $regex: search, $options: 'i' }

  const skip = (page - 1) * limit
  const [items, total] = await Promise.all([
    TaskModel.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
    TaskModel.countDocuments(filter),
  ])

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

export const getTaskById = async (id: string, userId: string): Promise<ITask> => {
  const task = await TaskModel.findOne({ _id: id, userId })
  if (!task) throw new Error('Task not found')
  return task
}

export const createTask = async (userId: string, input: CreateTaskInput): Promise<ITask> => {
  const lastTask = await TaskModel.findOne({ userId, status: input.status }).sort({ order: -1 })
  const order = lastTask ? lastTask.order + 1 : 0

  return TaskModel.create({
    ...input,
    userId,
    order,
    dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
  })
}

export const updateTask = async (
  id: string,
  userId: string,
  input: UpdateTaskInput
): Promise<ITask> => {
  const task = await TaskModel.findOneAndUpdate(
    { _id: id, userId },
    {
      ...input,
      ...(input.dueDate && { dueDate: new Date(input.dueDate) }),
    },
    { new: true, runValidators: true }
  )
  if (!task) throw new Error('Task not found')
  return task
}

export const deleteTask = async (id: string, userId: string): Promise<void> => {
  const task = await TaskModel.findOneAndDelete({ _id: id, userId })
  if (!task) throw new Error('Task not found')
}

export const updateTaskStatus = async (
  id: string,
  userId: string,
  status: ITask['status']
): Promise<ITask> => {
  const task = await TaskModel.findOneAndUpdate(
    { _id: id, userId },
    { status },
    { new: true }
  )
  if (!task) throw new Error('Task not found')
  return task
}

export const reorderTasks = async (
  userId: string,
  taskOrders: { id: string; order: number; status: ITask['status'] }[]
): Promise<void> => {
  await Promise.all(
    taskOrders.map(({ id, order, status }) =>
      TaskModel.findOneAndUpdate({ _id: id, userId }, { order, status })
    )
  )
}
