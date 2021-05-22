const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const utils = require('../utils/utils');
const Tokens = require('../models/index').Tokens;
const Users = require('../models/index').Users;

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

  return res.status(StatusCodes.OK).json({data: token});
}

const user = async  (req, res, next) => {
  const body = req.body;
    console.log(body)
    const _token =  await Tokens.findOne({
      where: { token: body.token },
      raw: true,
    })

  console.log(_token)
  const user = await Users.findOne({
    where: { userId: _token.userId },
    raw: true,
  })

  console.log('sdfdsfsdfsdfsfs', user)
  return res.status(StatusCodes.OK).json({data: user});
}
  

module.exports = { get, login, user };
