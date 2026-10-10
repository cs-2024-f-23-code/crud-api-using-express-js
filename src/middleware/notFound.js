const createError = require('http-errors');
module.exports = (req, _res, next) => next(createError(404, `Route not found: ${req.method} ${req.originalUrl}`));
