import { UserModel } from '../models/user.model.js';

async function adminMiddleware(req, res, next) {
  const user = await UserModel.findById(req.user.userId).select('role');
  if (user.role !== 'admin') {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  next();
}

export { adminMiddleware };
