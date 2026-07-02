import { RequestHandler } from 'express';
import { ZodTypeAny } from 'zod';

export const validateBody = (schema: ZodTypeAny): RequestHandler => {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        issues: parsed.error.issues,
      });
    }

    req.body = parsed.data;
    next();
  };
};
