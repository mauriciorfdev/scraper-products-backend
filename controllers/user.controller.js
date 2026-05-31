import { UserModel } from '../models/user.model.js';

// GET /api/users
async function getUsers(req, res) {
  const users = await UserModel.find().select('name email');

  return res.status(200).json(users);
}

// GET /api/users/profile
async function getProfile(req, res) {
  const user = await UserModel.findById(req.user.userId).select('-password');
  if (!user) return res.status(401).json({ msg: 'Unauthorized' });
  req.user = user;
  res.status(200).json({ msg: req.user });
}

export { getUsers, getProfile };
