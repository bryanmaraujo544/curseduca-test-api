import { Request, Response } from 'express';
import PostsRepository from '../repositories/PostsRepository';

class PostController {
  async index(req: any, res: Response) {
    const posts = await PostsRepository.findAll();
    res.send(posts);
  }

  async store(req: any, res: Response) {
    const { userId } = req;
    const { content } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ post: null, message: 'Some fields are missing.' });
    }

    const post = await PostsRepository.create({ userId, content });
    res.json({ message: 'Post created.', post });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ post: null, message: 'Some fields are missing.' });
    }

    const newPost = await PostsRepository.update({ id: Number(id), content });
    res.json({ message: 'Post updated.', post: newPost });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await PostsRepository.delete(Number(id));

    res.sendStatus(200);
  }
}

export default new PostController();
