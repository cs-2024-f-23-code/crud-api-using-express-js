const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (await User.exists({ email })) throw createError(409, 'Email is already registered');
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
    res.status(201).json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) throw createError(401, 'Invalid email or password');
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
};
