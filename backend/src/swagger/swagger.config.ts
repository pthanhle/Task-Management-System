import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management System API',
      version: '1.0.0',
      description: 'RESTful API documentation for Task Management System',
    },
    servers: [{ url: '/api/v1', description: 'API v1' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ApiSuccess: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object' },
            message: { type: 'string' },
          },
        },
        ApiError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string' },
            statusCode: { type: 'number' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['TODO', 'IN_PROGRESS', 'DONE'] },
            priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] },
            dueDate: { type: 'string', format: 'date-time' },
            order: { type: 'number' },
            tags: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/v1/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)
