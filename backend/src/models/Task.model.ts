import mongoose, { Document, Schema, Types } from 'mongoose'

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface ITask extends Document {
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: Date
  userId: Types.ObjectId
  order: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'],
      default: 'TODO',
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

taskSchema.index({ userId: 1, status: 1 })
taskSchema.index({ userId: 1, priority: 1 })
taskSchema.index({ userId: 1, dueDate: 1 })
taskSchema.index({ userId: 1, title: 'text' })

export const TaskModel = mongoose.model<ITask>('Task', taskSchema)
