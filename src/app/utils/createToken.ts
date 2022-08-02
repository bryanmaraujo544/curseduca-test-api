import jwt from 'jsonwebtoken';

export const createToken = (fields: any) => {
  const token = jwt.sign({ ...fields }, process.env.SECRET_KEY as string);
  return token;
};
