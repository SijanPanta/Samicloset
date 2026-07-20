import { NextFunction, Request, Response } from 'express';
import * as userServices from '../modules/user/user.services.js';

type AuthUser = {
  id: string;
  role: string;
};

export type AuthenticatedRequest = Request & {
  user?: AuthUser;
};

const getTokenFromRequest = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return undefined;

  const tokenCookie = cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('token='));

  if (!tokenCookie) return undefined;
  return decodeURIComponent(tokenCookie.slice('token='.length));
};

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const payload = await userServices.verifyToken(token);

    if (
      !payload ||
      typeof payload === 'string' ||
      typeof (payload as { id?: unknown }).id !== 'string'
    ) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await userServices.getUserById(payload.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    (req as AuthenticatedRequest).user = {
      id: user.userId,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthenticatedRequest;
  if (!authReq.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (authReq.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};
