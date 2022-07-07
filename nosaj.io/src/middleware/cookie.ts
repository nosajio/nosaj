import { Handler } from 'express';
import { ulid } from 'ulid';

const daysInSecs = (days: number) => days * 24 * 60 * 60;

export const tokenCookie: Handler = (req, res, next) => {
  const nosid = req.cookies?.['x-nosid'];
  if (nosid) {
    res.set('x-nosid', nosid);
  } else {
    const token = ulid();
    res.cookie('x-nosid', token, { maxAge: daysInSecs(14), httpOnly: true });
    res.set('x-nosid', token);
  }
  next();
};
