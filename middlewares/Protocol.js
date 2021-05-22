const { StatusCodes } = require('http-status-codes');

const Protocol = (req, res, next) => {
  if (req.protocol !== 'https') {
    throw Error({ status: StatusCodes.SEE_OTHER, message: 'not https' });
  }
  next();
};

module.exports = { Protocol };
