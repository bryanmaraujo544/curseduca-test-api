import prisma from '../../prisma';

interface User {
  name: string;
  email: string;
  password: string;
  profileImg: string;
}

class UsersRepository {
  async findAll() {
    const users = await prisma.user.findMany({});
    return users;
  }

  async create({ name, email, password, profileImg }: User) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        profileImg,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: number) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          email: true,
          name: true,
          profileImg: true,
        },
      });
      return user;
    } catch {
      return null;
    }
  }
}

export default new UsersRepository();
