const jwt = require('jsonwebtoken');

const issueToken = (username: string) => {
  const secret = process.env.SECRET;
  return secret && jwt.sign({ username }, secret, { expiresIn: '24h' });
};

export default issueToken;
