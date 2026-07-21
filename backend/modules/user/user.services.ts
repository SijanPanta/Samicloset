import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { User } = db as any;

export const getUserById = async (id: string) => {
  const user = await User.findOne({ where: { userId: id } });
  if (user) return user;

  // Fallback for internal numeric primary key lookups.
  const byPrimaryKey = await User.findByPk(id);
  return byPrimaryKey;
};

export const getUserByPublicId = async (userId: string) => {
  const user = await User.findOne({ where: { userId } });
  return user;
};

export const createUser = async (data: { name: string; email: string; password: string; role?: string }) => {
  console.log('Creating user with data:', data);
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = async (user: any) => {
  console.log('Generating token for user:', user.userId);
  const token = jwt.sign({ id: user.userId, role: user.role  }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return token;
};

export const verifyToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};
