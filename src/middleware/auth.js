const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function auth(req, _res, next) {
  try {
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    if (scheme !== 'Bearer' || !token) throw createError(401, 'Authentication token required');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) throw createError(401, 'User no longer exists');
    req.user = user;
    next();
  } catch (error) { next(error.status ? error : createError(401, 'Invalid or expired token')); }
};
