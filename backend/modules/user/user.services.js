import db from '../../models/index.js'
import config from 'dotenv'
config.config()

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUserById = async (id) => {
  const user = await db.User.findByPk(id)
  return user
}

export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const user = await db.User.create({ ...data, password: hashedPassword })
  return user
}

export const getUserByEmail = async (email) => {
  const user = await db.User.findOne({ where: { email } })
  return user
}

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = async (user) => {
  console.log('Generating token for user:', user.userId)
  const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

export const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}