import { Request, Response } from 'express';
import { SavePostService } from '../services/SavePostService';

export class SavePostController {
  constructor(private savePostService: SavePostService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { title, content, author } = req.body;
      const post = await this.savePostService.execute({ title, content, author });
      return res.status(201).json(post);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}