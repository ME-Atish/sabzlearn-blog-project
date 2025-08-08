module.exports = (validator) => {
  return async (req, res, next) => {
    try {
      await validator.validate(req.body);
    } catch (err) {
      return res.status(500).json({ err: err.errors });
    }
    next();
  };
};
