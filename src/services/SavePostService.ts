import { Post } from '../entities/Post';
import { PostRepository } from '../repositories/PostRepository';

export class SavePostService {
  constructor(private postRepository: PostRepository) {}

  async execute(input: { title: string; content: string; author: string }): Promise<Post> {
    if (!input.title || !input.content || !input.author) {
      throw new Error('title, content and author are required');
    }

    if (input.content.length > 5000) {
      throw new Error('content exceeds maximum length of 5000 characters');
    }

    return this.postRepository.save(input);
  }
}