import prisma from '../../prisma';

interface User {
  name: string;
  email: string;
  password: string;
}

class UsersRepository {
  async findAll() {
    const users = await prisma.user.findMany({});
    return users;
  }

  async create({ name, email, password }: User) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
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
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  }
}

export default new UsersRepository();
