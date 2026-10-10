module.exports = (err, _req, res, _next) => {
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Internal server error';
  if (err.name === 'ValidationError') { status = 400; message = err.message; }
  if (err.name === 'CastError') { status = 400; message = 'Invalid resource ID'; }
  if (err.code === 11000) { status = 409; message = 'A record with that unique value already exists'; }
  if (err.name === 'MulterError') { status = 400; message = err.message; }
  res.status(status).json({ success: false, message, ...(err.details ? { errors: err.details } : {}), ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}) });
};
