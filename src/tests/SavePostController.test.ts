import { SavePostController } from '../controllers/SavePostController';
import { SavePostService } from '../services/SavePostService';
import { Post } from '../entities/Post';
import { mockRequest } from '../__mocks__/mockRequest';
import { mockResponse } from '../__mocks__/mockResponse';
import { Request, Response } from 'express';

describe('SavePostController', () => {
  let savePostController: SavePostController;
  let mockSavePostService: jest.Mocked<SavePostService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockSavePostService = { execute: jest.fn() } as unknown as jest.Mocked<SavePostService>;
    savePostController = new SavePostController(mockSavePostService);
    req = mockRequest();
    res = mockResponse();
  });

  it('should return 201 and the saved post on success', async () => {
    const body = { title: 'Post', content: 'Conteudo', author: 'dj' };
    req.body = body;
    const saved: Post = { id: 'uuid-1', ...body, createdAt: new Date() };
    mockSavePostService.execute.mockResolvedValue(saved);
    await savePostController.handle(req as Request, res as Response);
    expect(mockSavePostService.execute).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(saved);
  });

  it('should return 400 with error message when service throws', async () => {
    req.body = { title: '', content: '', author: '' };
    mockSavePostService.execute.mockRejectedValue(new Error('title, content and author are required'));
    await savePostController.handle(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'title, content and author are required' });
  });
});