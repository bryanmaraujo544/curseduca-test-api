import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyRequest extends Request {
  userId: number;
}

interface JWTPayload {
  id: number;
}

export const ensureAuthentication = (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  console.log({ authorization });

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.split(' ')[1];

  try {
    const tokenDecoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JWTPayload;
    console.log({ tokenDecoded });

    if (tokenDecoded) {
      req.userId = tokenDecoded.id;
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch {
    return res.sendStatus(401);
  }
};
