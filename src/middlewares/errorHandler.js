export async function errorHandler(error, _req, res, next) {
  if (error) {
    res.status(500).send({ error: error.message });
  }

  next(error);
};
