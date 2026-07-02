import { UserModel } from '../models/user.model.js';

// GET /api/users
async function getUsers(req, res) {
  const users = await UserModel.find().select('name email');

  return res.status(200).json(users);
}

export { getUsers };
