import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { User } = db as any;

export const getUserById = async (id: string) => {
  const user = await User.findByPk(id);
  return user;
};

export const createUser = async (data: { name: string; email: string; password: string }) => {
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
  const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return token;
};

export const verifyToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
