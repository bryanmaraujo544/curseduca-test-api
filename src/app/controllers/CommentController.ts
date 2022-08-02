import { Request, Response } from 'express';
import CommentsRepository from '../repositories/CommentsRepository';

class CommentController {
  async index(req: Request, res: Response) {
    const comments = await CommentsRepository.findAll();
    res.send(comments);
  }

  async store(req: any, res: Response) {
    const { userId } = req;
    const { postId, content } = req.body;

    if (!postId || !content) {
      return res
        .status(400)
        .json({ message: 'Some fields are missing.', comment: null });
    }

    const comment = await CommentsRepository.create({
      userId,
      postId,
      content,
    });

    res.json({ message: 'Comment created', comment });
  }

  async delete(req: any, res: Response) {
    const { id } = req.params;

    await CommentsRepository.delete(Number(id));

    res.sendStatus(200);
  }
}

export default new CommentController();
