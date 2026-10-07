import { Router } from 'express'
import * as taskController from '../../controllers/task.controller'
import { authenticate } from '../../middlewares/auth.middleware'
import { validate } from '../../middlewares/validate.middleware'
import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
  reorderTasksSchema,
  getTasksQuerySchema,
} from '../../schemas/task.schema'

const router = Router()

router.use(authenticate)

router.get('/', validate(getTasksQuerySchema), taskController.getTasks)
router.post('/', validate(createTaskSchema), taskController.createTask)
router.patch('/reorder', validate(reorderTasksSchema), taskController.reorderTasks)
router.get('/:id', taskController.getTaskById)
router.put('/:id', validate(updateTaskSchema), taskController.updateTask)
router.delete('/:id', taskController.deleteTask)
router.patch('/:id/status', validate(updateTaskStatusSchema), taskController.updateTaskStatus)

export default router
