import { EntityManager } from 'typeorm';
import { PostRepository } from '../repositories/PostRepository';
import { Post } from '../entities/Post';
import { mockEntityManager, MockEntityManager } from '../__mocks__/getEntityManagerMock';

describe('PostRepository', () => {
  let postRepository: PostRepository;
  let entityManager: MockEntityManager;

  beforeEach(() => {
    entityManager = mockEntityManager();
    postRepository = new PostRepository(entityManager as unknown as EntityManager);
  });

  describe('save', () => {
    it('should create and save a post, returning the persisted entity', async () => {
      const input = { title: 'TDD na pratica', content: 'Conteudo', author: 'dj' };
      const created = { id: 'uuid-1', ...input, createdAt: new Date() };
      const repository = entityManager.getRepository();
      (repository.create as jest.Mock).mockReturnValue(created);
      (repository.save as jest.Mock).mockResolvedValue(created);

      const result = await postRepository.save(input);

      expect(repository.create).toHaveBeenCalledWith(input);
      expect(repository.save).toHaveBeenCalledWith(created);
      expect(result).toEqual(created);
    });

    it('should propagate database errors', async () => {
      const repository = entityManager.getRepository();
      (repository.save as jest.Mock).mockRejectedValue(new Error('UNIQUE constraint failed'));
      await expect(postRepository.save({ title: 'dup' } as Partial<Post>))
        .rejects.toThrow('UNIQUE constraint failed');
    });
  });

  describe('findAll', () => {
    it('should return all posts from the repository', async () => {
      const posts = [{ id: '1', title: 'A' }, { id: '2', title: 'B' }];
      const repository = entityManager.getRepository();
      (repository.find as jest.Mock).mockResolvedValue(posts);
      const result = await postRepository.findAll();
      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result).toEqual(posts);
    });
  });
});