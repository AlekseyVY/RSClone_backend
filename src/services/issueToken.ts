import jwt from 'jsonwebtoken';

const issueToken = (username: string) => {
  const secret = process.env.SECRET;
  return secret && jwt.sign({ username }, secret);
};

export default issueToken;
