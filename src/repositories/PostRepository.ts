import { EntityManager, Repository } from 'typeorm';
import { Post } from '../entities/Post';

export class PostRepository {
  private repository: Repository<Post>;

  constructor(private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(Post);
  }

  async save(postData: Partial<Post>): Promise<Post> {
    const post = this.repository.create(postData);
    return this.repository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.repository.find();
  }
}