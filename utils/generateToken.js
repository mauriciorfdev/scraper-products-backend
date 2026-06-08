import jwt from 'jsonwebtoken';

function generateToken(userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1m',
  });
  return token;
}

export { generateToken };
