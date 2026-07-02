import { Request, Response } from 'express';
import * as userServices from './user.services.js';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await userServices.createUser({ name, email, password, role });
    const token = await userServices.generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await userServices.getUserByEmail(email);
  try {
    if (!user) {
        res.status(400).json({ error: 'User does not exist' });
    } else if (!(await userServices.verifyPassword(password, user.password))) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      const token = await userServices.generateToken(user);
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ token, user });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
