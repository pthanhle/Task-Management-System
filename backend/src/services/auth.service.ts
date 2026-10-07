import { UserModel } from '../models/User.model'
import { hashPassword, comparePassword } from '../utils/hash.util'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.util'
import { RegisterInput, LoginInput } from '../schemas/auth.schema'

export const registerUser = async (input: RegisterInput) => {
  const existing = await UserModel.findOne({ email: input.email })
  if (existing) throw new Error('Email already registered')

  const hashed = await hashPassword(input.password)
  const user = await UserModel.create({
    email: input.email,
    password: hashed,
    fullName: input.fullName,
  })

  return { id: user._id, email: user.email, fullName: user.fullName }
}

export const loginUser = async (input: LoginInput) => {
  const user = await UserModel.findOne({ email: input.email })
  if (!user) throw new Error('Invalid credentials')

  const isMatch = await comparePassword(input.password, user.password)
  if (!isMatch) throw new Error('Invalid credentials')

  const accessToken = signAccessToken(user._id.toString())
  const refreshToken = signRefreshToken(user._id.toString())

  await UserModel.findByIdAndUpdate(user._id, {
    $push: { refreshTokens: { $each: [refreshToken], $slice: -10 } },
  })

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
    },
  }
}

export const refreshUserToken = async (oldRefreshToken: string) => {
  const decoded = verifyRefreshToken(oldRefreshToken)
  const user = await UserModel.findById(decoded.userId)

  if (!user || !user.refreshTokens.includes(oldRefreshToken)) {
    throw new Error('Invalid refresh token')
  }

  const newAccessToken = signAccessToken(user._id.toString())
  const newRefreshToken = signRefreshToken(user._id.toString())

  await UserModel.findByIdAndUpdate(user._id, {
    $pull: { refreshTokens: oldRefreshToken },
  })
  await UserModel.findByIdAndUpdate(user._id, {
    $push: { refreshTokens: { $each: [newRefreshToken], $slice: -10 } },
  })

  return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}

export const logoutUser = async (userId: string, refreshToken: string) => {
  await UserModel.findByIdAndUpdate(userId, {
    $pull: { refreshTokens: refreshToken },
  })
}

export const logoutAllDevices = async (userId: string) => {
  await UserModel.findByIdAndUpdate(userId, { refreshTokens: [] })
}

export const getMe = async (userId: string) => {
  const user = await UserModel.findById(userId).select('-password -refreshTokens')
  if (!user) throw new Error('User not found')
  return user
}
