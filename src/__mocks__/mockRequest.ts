import { Request } from 'express';

export const mockRequest = (body: any = {}): Partial<Request> => ({
  body,
});