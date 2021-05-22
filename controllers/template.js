const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { getTemplate } = require('../service/template');

const template = async (req, res, next) => {
  const erros = validationResult(req.erros);

  if (!erros.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  return res.status(StatusCodes.OK).json();
};

module.exports = { template };
