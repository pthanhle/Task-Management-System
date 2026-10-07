import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { UserModel } from '../models/User.model'
import { TaskModel } from '../models/Task.model'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-management'

const users = [
  { email: 'alice@example.com', password: 'Password123', fullName: 'Alice Nguyen' },
  { email: 'bob@example.com', password: 'Password123', fullName: 'Bob Tran' },
]

const taskTemplates = [
  { title: 'Set up project repository', status: 'DONE', priority: 'HIGH', order: 0 },
  { title: 'Design database schema', status: 'DONE', priority: 'HIGH', order: 1 },
  { title: 'Implement authentication API', status: 'IN_PROGRESS', priority: 'URGENT', order: 0 },
  { title: 'Build task management CRUD', status: 'IN_PROGRESS', priority: 'HIGH', order: 1 },
  { title: 'Implement Kanban drag and drop', status: 'TODO', priority: 'MEDIUM', order: 0, daysFromNow: 3 },
  { title: 'Write unit tests for auth service', status: 'TODO', priority: 'MEDIUM', order: 1, daysFromNow: 5 },
  { title: 'Set up Docker Compose', status: 'TODO', priority: 'LOW', order: 2, daysFromNow: 7 },
  { title: 'Create API documentation', status: 'TODO', priority: 'LOW', order: 3, daysFromNow: 9 },
]

const seed = async () => {
  await mongoose.connect(MONGODB_URI)

  await UserModel.deleteMany({})
  await TaskModel.deleteMany({})

  for (const userData of users) {
    const hashed = await bcrypt.hash(userData.password, 12)
    const user = await UserModel.create({
      email: userData.email,
      password: hashed,
      fullName: userData.fullName,
    })

    await Promise.all(
      taskTemplates.map(template => {
        const dueDate = template.daysFromNow
          ? new Date(Date.now() + template.daysFromNow * 24 * 60 * 60 * 1000)
          : undefined
        return TaskModel.create({
          title: template.title,
          status: template.status,
          priority: template.priority,
          order: template.order,
          userId: user._id,
          dueDate,
        })
      })
    )
  }

  console.log('Seed completed: 2 users, 8 tasks each')
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
