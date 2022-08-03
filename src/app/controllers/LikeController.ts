import { Request, Response } from 'express';
import LikesRepository from '../repositories/LikesRepository';

class LikeController {
  async index(req: Request, res: Response) {
    const likes = await LikesRepository.findAll();
    res.send(likes);
  }

  async store(req: any, res: Response) {
    const { userId } = req;
    const { postId } = req.body;

    if (!postId) {
      return res
        .status(400)
        .json({ message: 'Some fields are missing.', like: null });
    }

    const userAlredyLikedPost = await LikesRepository.findByUserIdAndPostId({
      postId,
      userId,
    });
    if (userAlredyLikedPost) {
      return res.json({ message: 'Already liked', like: userAlredyLikedPost });
    }

    const like = await LikesRepository.create({
      userId: Number(userId),
      postId: Number(postId),
    });

    res.json({ message: 'Like created', like });
  }

  async delete(req: any, res: Response) {
    const { userId } = req;
    const { postId } = req.params;

    await LikesRepository.delete({
      userId: Number(userId),
      postId: Number(postId),
    });

    res.sendStatus(200);
  }
}

export default new LikeController();
