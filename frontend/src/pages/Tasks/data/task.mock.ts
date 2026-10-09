import type { Task } from '@/pages/Tasks/types/task.types'
import type { ApiResponse, PaginatedData, PaginatedResponse } from '@/types/api.types'

export const MOCK_TASKS: Task[] = [
  {
    _id: '507f1f77bcf86cd799439021',
    title: 'Design System — Setup component library',
    description: 'Initialize AntD design tokens and global theme configuration.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2026-10-15T00:00:00.000Z',
    tags: ['frontend', 'design'],
    order: 1000,
    workspaceId: "ws-1",
    userId: '507f1f77bcf86cd799439011',
    createdAt: '2026-10-01T08:00:00.000Z',
    updatedAt: '2026-10-05T14:20:00.000Z',
  },
  {
    _id: '507f1f77bcf86cd799439022',
    title: 'Implement — Auth module (login, register)',
    description: 'Build login and register pages with form validation.',
    status: 'TODO',
    priority: 'URGENT',
    dueDate: '2026-10-10T00:00:00.000Z',
    tags: ['frontend', 'auth'],
    order: 2000,
    workspaceId: "ws-1",
    userId: '507f1f77bcf86cd799439011',
    createdAt: '2026-10-01T09:00:00.000Z',
    updatedAt: '2026-10-01T09:00:00.000Z',
  },
  {
    _id: '507f1f77bcf86cd799439023',
    title: 'Review — Backend API contracts',
    description: 'Verify all API endpoints match Swagger documentation.',
    status: 'DONE',
    priority: 'MEDIUM',
    dueDate: '2026-10-05T00:00:00.000Z',
    tags: ['backend', 'review'],
    order: 3000,
    workspaceId: "ws-1",
    userId: '507f1f77bcf86cd799439011',
    createdAt: '2026-10-02T07:00:00.000Z',
    updatedAt: '2026-10-05T16:00:00.000Z',
  },
  {
    _id: '507f1f77bcf86cd799439024',
    title: 'Test — Integration tests for task CRUD',
    description: 'Write Vitest + Supertest integration tests.',
    status: 'TODO',
    priority: 'LOW',
    dueDate: undefined,
    tags: ['testing'],
    order: 4000,
    workspaceId: "ws-1",
    userId: '507f1f77bcf86cd799439011',
    createdAt: '2026-10-03T10:00:00.000Z',
    updatedAt: '2026-10-03T10:00:00.000Z',
  },
  {
    _id: '507f1f77bcf86cd799439025',
    title: 'Deploy — Setup Railway CI/CD pipeline',
    description: 'Configure Railway deployment with environment variables.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2026-10-20T00:00:00.000Z',
    tags: ['devops'],
    order: 5000,
    workspaceId: "ws-1",
    userId: '507f1f77bcf86cd799439011',
    createdAt: '2026-10-04T08:30:00.000Z',
    updatedAt: '2026-10-06T11:00:00.000Z',
  },
]

const MOCK_PAGINATED_TASKS: PaginatedData<Task> = {
  items: MOCK_TASKS,
  total: 5,
  page: 1,
  limit: 10,
  totalPages: 1,
}

export const MOCK_TASKS_RESPONSE: PaginatedResponse<Task> = {
  success: true,
  data: MOCK_PAGINATED_TASKS,
}

export const MOCK_TASK_DETAIL_RESPONSE = (id: string): ApiResponse<Task> => ({
  success: true,
  data: MOCK_TASKS.find(t => t._id === id) ?? MOCK_TASKS[0],
})
