import jwt from 'jsonwebtoken';
const jwt_key = process.env.JWT_SECRET;

function generateToken(userId) {
  const token = jwt.sign({ userId }, jwt_key, {
    expiresIn: '1m',
  });
  return token;
}

export { generateToken };
