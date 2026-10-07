import { z } from 'zod'

const TaskStatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE'])
const TaskPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).trim(),
    description: z.string().max(2000).optional(),
    status: TaskStatusEnum.default('TODO'),
    priority: TaskPriorityEnum.default('MEDIUM'),
    dueDate: z.string().datetime().optional(),
    tags: z.array(z.string()).default([]),
  }),
})

export const updateTaskSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    title: z.string().min(1).max(200).trim().optional(),
    description: z.string().max(2000).optional(),
    status: TaskStatusEnum.optional(),
    priority: TaskPriorityEnum.optional(),
    dueDate: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
  }),
})

export const updateTaskStatusSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({ status: TaskStatusEnum }),
})

export const reorderTasksSchema = z.object({
  body: z.object({
    taskOrders: z.array(
      z.object({
        id: z.string(),
        order: z.number().int().nonnegative(),
        status: TaskStatusEnum,
      })
    ),
  }),
})

export const getTasksQuerySchema = z.object({
  query: z.object({
    status: TaskStatusEnum.optional(),
    priority: TaskPriorityEnum.optional(),
    search: z.string().optional(),
    page: z.coerce.number().positive().default(1),
    limit: z.coerce.number().positive().max(100).default(10),
  }),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>['body']
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>['body']
export type GetTasksQuery = z.infer<typeof getTasksQuerySchema>['query']
