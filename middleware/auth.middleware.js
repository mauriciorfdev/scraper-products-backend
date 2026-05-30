import jwt from 'jsonwebtoken';
const jwt_key = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const header = req.header('Authorization');
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token not provided' });
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, jwt_key);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
}

export { authMiddleware };
