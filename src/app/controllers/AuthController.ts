import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import { isSomeEmpty } from '../utils/isSomeEmpty';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/createToken';
class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (isSomeEmpty([email, password])) {
      return res
        .status(400)
        .json({ message: 'Some fields are missing.', token: null });
    }

    const userByEmail = await UsersRepository.findByEmail(email);
    if (!userByEmail) {
      return res
        .status(403)
        .json({ message: 'The user does not exists.', token: null });
    }

    const hashedPassword = userByEmail.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json({ message: 'There are wrong values.', token: null });
    }

    const token = createToken({ id: userByEmail.id });
    res.json({ message: 'User logged in', token });
  }

  async auth(req: Request, res: Response) {
    res.sendStatus(200);
  }
}

export default new AuthController();
