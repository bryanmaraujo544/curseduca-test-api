import prisma from '../../prisma';

interface Create {
  postId: number;
  userId: number;
}
class LikesRepository {
  async findAll() {
    const likes = await prisma.like.findMany({});
    return likes;
  }

  async create({ postId, userId }: Create) {
    const like = await prisma.like.create({
      data: {
        postId: Number(postId),
        authorId: userId,
      },
    });

    return like;
  }

  async delete({ postId, userId }: Create) {
    try {
      await prisma.like.deleteMany({
        where: {
          AND: [
            {
              authorId: userId,
            },
            {
              postId,
            },
          ],
        },
      });
      return;
    } catch {
      return;
    }
  }

  async findByUserIdAndPostId({ postId, userId }: Create) {
    const like = await prisma.like.findFirst({
      where: {
        AND: [
          {
            authorId: Number(userId),
          },
          {
            postId: Number(postId),
          },
        ],
      },
    });
    return like;
  }
}

export default new LikesRepository();
