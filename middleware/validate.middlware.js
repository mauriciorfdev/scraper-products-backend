const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.errors = result.error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path[0],
      }));
      next(error);
    }
    next();
  };
};

export { validateMiddleware };
