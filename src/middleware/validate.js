const { validationResult } = require('express-validator');
module.exports = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(Object.assign(new Error('Request validation failed'), { status: 400, details: errors.array() }));
  next();
};
