import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { User } = db;
export const getUserById = async (id) => {
    const user = await User.findByPk(id);
    return user;
};
export const createUser = async (data) => {
    console.log('Creating user with data:', data);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashedPassword });
    return user;
};
export const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
};
export const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
export const generateToken = async (user) => {
    console.log('Generating token for user:', user.userId);
    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
export const verifyToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
//# sourceMappingURL=user.services.js.map