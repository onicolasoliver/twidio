import { EntityManager, Repository } from 'typeorm';

export const mockRepository = () => ({
  save: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

export const mockEntityManager = () => ({
  getRepository: jest.fn().mockReturnValue(mockRepository()),
});

export type MockEntityManager = ReturnType<typeof mockEntityManager>;