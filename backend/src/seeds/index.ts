import mongoose from 'mongoose'
import { connectDB } from '@shared/config/db.config'
import { UserModel } from '@modules/auth/user.model'
import { TaskModel } from '@modules/tasks/task.model'
import { hashPassword } from '@shared/utils/hash.util'

const seed = async () => {
  await connectDB()

  await UserModel.deleteMany({})
  await TaskModel.deleteMany({})

  const hashedPassword = await hashPassword('Password123!')

  const [alice, bob] = await UserModel.insertMany([
    { email: 'alice@example.com', password: hashedPassword, fullName: 'Alice Johnson' },
    { email: 'bob@example.com', password: hashedPassword, fullName: 'Bob Smith' },
  ])

  const statuses = ['TODO', 'IN_PROGRESS', 'DONE'] as const
  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const

  const buildTasks = (userId: mongoose.Types.ObjectId) =>
    Array.from({ length: 8 }, (_, i) => ({
      title: `Task ${i + 1} — ${['Design', 'Implement', 'Review', 'Test', 'Deploy', 'Document', 'Refactor', 'Fix'][i]}`,
      description: `Detailed description for task ${i + 1}`,
      status: statuses[i % 3],
      priority: priorities[i % 4],
      userId,
      order: i,
      tags: ['sample', i % 2 === 0 ? 'frontend' : 'backend'],
      dueDate: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
    }))

  await TaskModel.insertMany([...buildTasks(alice._id), ...buildTasks(bob._id)])

  console.log('Seed complete: 2 users, 16 tasks')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
