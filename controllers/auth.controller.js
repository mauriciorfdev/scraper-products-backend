import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import { mapUser } from '../utils/user.mapper.js';

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

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, //true in production
    sameSite: 'lax',
    maxAge: 1000 * 60 * 15,
  });

  return res.status(200).json({ msg: 'Login Successful' });
}

//ROUTE GET /api/auth/me
async function getCurrentUser(req, res) {
  const user = await UserModel.findById(req.user.userId).select('-password');
  if (!user) return res.status(401).json({ msg: 'Unauthorized' });
  const cleanUser = mapUser(user);
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, max-age=0',
  );
  return res.status(200).json(cleanUser);
}

//POST /api/auth/logout
async function logoutUser(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, //true in production (HTTPS)
    sameSite: 'lax',
  });
  return res.status(200).json({ msg: 'Logout Successful' });
}

export { registerUser, loginUser, getCurrentUser, logoutUser };
