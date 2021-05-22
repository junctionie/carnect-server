const { StatusCodes } = require('http-status-codes');

const Exception = (err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(err.status).json({ message: err.message });
  }

  const unknownErrorMessage = 'I dont know';
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: unknownErrorMessage });
};

module.exports = { Exception };
