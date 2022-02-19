import jwt from 'jsonwebtoken';

const issueToken = (username: string): string => {
  const secret = process.env.SECRET;
  const token = secret && jwt.sign({ username }, secret);
  return token ? token : 'NOT_WORKING'
};

export default issueToken;
