import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import { isEmailValid } from '../utils/IsEmailValid';
import { isPasswordValid } from '../utils/isPasswordValid';
import { isSomeEmpty } from '../utils/isSomeEmpty';
import bcrypt from 'bcrypt';
import { getRandomNumber } from '../utils/getRandomNumber';

const photos = [
  'https://i.pinimg.com/564x/fd/4c/c1/fd4cc10a0b9a1b1bcf3f6c0fca1673e6.jpg',
  'https://i.pinimg.com/564x/5d/73/bf/5d73bfcb05979a0540389dfadce8bdee.jpg',
  'https://i.pinimg.com/564x/24/0e/c2/240ec2fc262cbfc8786185af2e5b57e3.jpg',
  'https://i.pinimg.com/564x/86/1c/86/861c86e59841a1b66a478f9297d2d869.jpg',
  'https://i.pinimg.com/564x/11/2f/f7/112ff7fda21e25c663c883395be01350.jpg',
  'https://i.pinimg.com/564x/a8/aa/3b/a8aa3b398b069d7e7dc62ab2cc8f335f.jpg',
  'https://i.pinimg.com/564x/75/bb/8d/75bb8df61e58505884416fc6a9e206cf.jpg',
  'https://i.pinimg.com/564x/5d/20/37/5d2037ea5eed386d8c3428c399ac0f61.jpg',
  'https://i.pinimg.com/236x/c7/4d/69/c74d69676ff0e3bfc7834cbbb5eb4a73.jpg',
  'https://i.pinimg.com/564x/2e/0a/2c/2e0a2c1b8c283c00d138692241202f20.jpg',
];
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

    const profileImg = photos[getRandomNumber()];

    const userCreated = await UsersRepository.create({
      email,
      name,
      password: hashPassword,
      profileImg,
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
