import prisma from '../../prisma';

interface Create {
  userId: number;
  postId: number;
  content: string;
}

class CommentsRepository {
  async findAll() {
    const comments = await prisma.comment.findMany({});
    return comments;
  }
  async create({ content, postId, userId }: Create) {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: Number(userId),
        postId: Number(postId),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImg: true,
          },
        },
      },
    });
    return comment;
  }
  async delete(id: number) {
    try {
      await prisma.comment.delete({
        where: {
          id: Number(id),
        },
      });
    } catch {
      return;
    }

    return;
  }
}

export default new CommentsRepository();
