import type { AuthTokens, User } from '@/pages/Auth/_shared/types/auth.types'
import type { ApiResponse } from '@/types/api.types'

export const MOCK_USER_ALICE: User = {
  _id: '507f1f77bcf86cd799439011',
  email: 'alice@example.com',
  fullName: 'Alice Johnson',
  createdAt: '2026-01-15T08:00:00.000Z',
  updatedAt: '2026-09-01T10:30:00.000Z',
}

export const MOCK_AUTH_TOKENS: AuthTokens = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock',
  refreshToken: 'mock-refresh-token',
  user: MOCK_USER_ALICE,
}

export const MOCK_LOGIN_RESPONSE: ApiResponse<AuthTokens> = {
  success: true,
  data: MOCK_AUTH_TOKENS,
}

export const MOCK_ME_RESPONSE: ApiResponse<User> = {
  success: true,
  data: MOCK_USER_ALICE,
}
