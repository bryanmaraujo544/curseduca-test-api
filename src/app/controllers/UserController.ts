import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import { isEmailValid } from '../utils/IsEmailValid';
import { isPasswordValid } from '../utils/isPasswordValid';
import { isSomeEmpty } from '../utils/isSomeEmpty';
import bcrypt from 'bcrypt';

class UserController {
  async index(req: Request, res: Response) {
    const users = await UsersRepository.findAll();
    res.send(users);
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (isSomeEmpty([name, email, password])) {
      return res
        .status(400)
        .json({ message: 'Some fields are missing.', user: null });
    }

    if (!isEmailValid(email) || !isPasswordValid(password)) {
      return res
        .status(403)
        .json({ message: 'There are invalid values.', user: null });
    }

    const isEmailInUse = await UsersRepository.findByEmail(email);
    if (isEmailInUse) {
      return res
        .status(403)
        .json({ message: 'The email is already in use', user: null });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userCreated = await UsersRepository.create({
      email,
      name,
      password: hashPassword,
    });

    return res.json({ message: 'User registered', user: userCreated });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await UsersRepository.findById(Number(id));

    if (!user) {
      return res.status(400).json({ user: null, message: 'User not found' });
    }

    res.json({ user, message: 'User found' });
  }
}

export default new UserController();
