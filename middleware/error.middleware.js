const errorMiddleware = (err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ msg: err.message || 'Internal Server Error...' });
};

export { errorMiddleware };
