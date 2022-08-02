import { DateTime } from 'luxon';
import prisma from '../../prisma';

interface CreateProps {
  userId: number;
  content: string;
}

interface UpdateProps {
  id: number;
  content: string;
}

class PostsRepository {
  async findAll() {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImg: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                profileImg: true,
              },
            },
          },
        },
        likes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  }

  async create({ userId, content }: CreateProps) {
    const post = await prisma.post.create({
      data: {
        authorId: Number(userId),
        content,
        createdAt: DateTime.local().setZone('UTC-3').toISO(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImg: true,
          },
        },
        comments: true,
        likes: true,
      },
    });
    return post;
  }

  async update({ id, content }: UpdateProps) {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        content,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImg: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                profileImg: true,
              },
            },
          },
        },
        likes: true,
      },
    });
    return post;
  }

  async delete(id: number) {
    try {
      await prisma.post.delete({
        where: {
          id: Number(id),
        },
      });
    } catch {
      return;
    }
  }
}

export default new PostsRepository();
