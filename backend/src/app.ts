import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { env } from './config/env.config'
import { connectDB } from './config/db.config'
import { errorHandler } from './middlewares/error.middleware'
import { swaggerSpec } from './swagger/swagger.config'
import authRouter from './routes/v1/auth.route'
import taskRouter from './routes/v1/task.route'
import dashboardRouter from './routes/v1/dashboard.route'

const app = express()

app.use(helmet())
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tasks', taskRouter)
app.use('/api/v1/dashboard', dashboardRouter)

app.use(errorHandler)

const start = async () => {
  await connectDB()
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`)
    console.log(`Swagger docs: http://localhost:${env.PORT}/api-docs`)
  })
}

start()

export default app
