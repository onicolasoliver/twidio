import { DataSource } from 'typeorm';
import { Post } from '../../entities/Post';
import { PostRepository } from '../../repositories/PostRepository';
import { SavePostService } from '../../services/SavePostService';
import { SavePostController } from '../../controllers/SavePostController';
import { mockRequest } from '../../__mocks__/mockRequest';
import { mockResponse } from '../../__mocks__/mockResponse';
import { Request, Response } from 'express';

describe('savePost integration', () => {
  let dataSource: DataSource;
  let savePostController: SavePostController;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [Post],
      logging: false,
    });
    await dataSource.initialize();
    const postRepository = new PostRepository(dataSource.manager);
    const savePostService = new SavePostService(postRepository);
    savePostController = new SavePostController(savePostService);
  });

  afterAll(async () => { await dataSource.destroy(); });
  beforeEach(async () => { await dataSource.getRepository(Post).clear(); });

  it('should persist a post end-to-end and return 201', async () => {
    const body = { title: 'Integracao', content: 'Teste real', author: 'dj' };
    const req = mockRequest(body);
    const res = mockResponse();
    await savePostController.handle(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    const persisted = await dataSource.getRepository(Post).findOne({ where: { title: 'Integracao' } });
    expect(persisted).toBeDefined();
    expect(persisted!.author).toBe('dj');
  });

  it('should return 400 on invalid input without touching the database', async () => {
    const req = mockRequest({ title: '', content: '', author: '' });
    const res = mockResponse();
    await savePostController.handle(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    const count = await dataSource.getRepository(Post).count();
    expect(count).toBe(0);
  });
});