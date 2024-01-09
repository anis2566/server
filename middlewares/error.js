// not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  process.env.NODE_ENV !== "production" && console.log(err);
  process.env.NODE_ENV !== "production" && console.log(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
