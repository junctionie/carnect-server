const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const utils = require('../utils/utils');

const get = async (req, res, next) => {
  //   const erros = validationResult(req.erros);

  //   if (!erros.isEmpty()) {
  //     return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  //   }
  console.log('req');
};

const login = async  (req, res, next) => {
  const body = req.body;
  const result = await utils.getKakaoUserInfor(body.access_token);
  if (!result) {
    throw "로그인 불가!!!!!!!!!!!!!!!!";
  }
  const user = await utils.kakaoLogin(
    body.id,
    body.access_token,
    result.body.properties
  );

  console.log(user)

  const token_data = {
    userId: user.userId,
  };
  
  const token = await utils.generateToken(token_data);
  console.log(token)

  return res.status(StatusCodes.OK).json({token});
}


module.exports = { get, login };
