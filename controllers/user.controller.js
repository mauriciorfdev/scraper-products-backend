import { UserModel } from '../models/user.model.js';
import { mapUser } from '../utils/user.mapper.js';

// GET /api/users
async function getUsers(req, res) {
  const users = await UserModel.find().select('name email role');
  const cleanUsers = users.map((user) => mapUser(user));
  return res.status(200).json(cleanUsers);
}

export { getUsers };
