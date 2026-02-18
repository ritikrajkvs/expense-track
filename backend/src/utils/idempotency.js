import { v4 as uuidv4 } from 'uuid';

export const getIdempotencyKey = (req) => {
  return req.headers['idempotency-key'] || uuidv4();
};
