import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

// DESC Register New User
// ROUTE POST /api/auth/register
async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ msg: 'Email already exists' });
  }

  const newUser = new UserModel({ name, email, password });
  await newUser.save();

  return res.status(201).json({ msg: 'User Created' });
}

// DESC Login User
// ROUTE POST /api/auth/login
async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(401).json({ msg: 'Invalid Credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: 'Invalid Credentials' });

  const token = generateToken(user._id);
  return res.status(200).json({ msg: 'Login OK', token });

  return res.status(200).json({ msg: 'Login Successful' });
}

export { registerUser, loginUser };
