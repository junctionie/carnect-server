const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const get = async (req, res, next) => {
  //   const erros = validationResult(req.erros);

  //   if (!erros.isEmpty()) {
  //     return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  //   }
  console.log('index controller', req.user);
  return res.status(StatusCodes.OK).json();
};

module.exports = { get };