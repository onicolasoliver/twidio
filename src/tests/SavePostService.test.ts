import { SavePostService } from '../services/SavePostService';
import { PostRepository } from '../repositories/PostRepository';
import { Post } from '../entities/Post';

describe('SavePostService', () => {
  let savePostService: SavePostService;
  let mockPostRepository: jest.Mocked<PostRepository>;

  beforeEach(() => {
    mockPostRepository = {
      save: jest.fn(),
      findAll: jest.fn(),
    } as unknown as jest.Mocked<PostRepository>;
    savePostService = new SavePostService(mockPostRepository);
  });

  it('should save a valid post and return the persisted entity', async () => {
    const input = { title: 'Titulo', content: 'Conteudo valido', author: 'dj' };
    const saved: Post = { id: 'uuid-1', ...input, createdAt: new Date() };
    mockPostRepository.save.mockResolvedValue(saved);
    const result = await savePostService.execute(input);
    expect(mockPostRepository.save).toHaveBeenCalledWith(input);
    expect(result).toEqual(saved);
  });

  it('should throw when title is missing', async () => {
    await expect(savePostService.execute({ title: '', content: 'x', author: 'dj' }))
      .rejects.toThrow('title, content and author are required');
  });

  it('should throw when content exceeds 5000 characters', async () => {
    const longContent = 'a'.repeat(5001);
    await expect(savePostService.execute({ title: 'x', content: longContent, author: 'dj' }))
      .rejects.toThrow('content exceeds maximum length of 5000 characters');
  });

  it('should not call repository when validation fails', async () => {
    await expect(savePostService.execute({ title: '', content: '', author: '' })).rejects.toThrow();
    expect(mockPostRepository.save).not.toHaveBeenCalled();
  });
});