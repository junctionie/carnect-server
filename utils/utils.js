const unirest = require('unirest');
const Users = require('../models/index').Users;
const Tokens = require('../models/index').Tokens;
const { v4: uuidv4 } = require("uuid");

const getKakaoUserInfor = async (access_token) => {
      return new Promise(function(resolve, reject) {
        unirest.post("https://kapi.kakao.com/v2/user/me")
        .headers({
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded ",
            Authorization: "Bearer " + access_token,
          })
          .end((result) => {
            // console.log(result.status, result.headers, result.body);
            if (result.status == 200) {
                resolve(result)
            } else {
              console.log("12221error = " + result.body);
              return null;
            }
          })
      });

  }
  
  const kakaoLogin = async ( kakaoId, kakaoToken, kakao_info) => {
    let user_data = {
        kakaoId,
        kakaoToken: kakaoToken,
        displayName: kakao_info.nickname,
        provider: 'kakao'
    };
    const user = await Users.findOne({
        where: { kakaoId},
        raw: true,
    })
  
    // // 유저가 없을 시 생성해주자
    if (!user) {
      let newUser = await Users.create(user_data);
      console.log(newUser)
      return newUser;
    } else {
    //   기존유저는 토큰 값을 업뎃시켜줌
      const find = await Users.findOne({
        where: { kakaoId},
        raw: true,
    })
      const result = await Users.update(kakaoToken, {
        where: {
            userId: find.userId
          }
      });
  
    }
  
    return user;
  }


  const generateToken = async(token_data) =>  {
    const token = uuidv4().replace(/-/g, "");
    console.log(token)
    const data = {
      userId: token_data.userId,
      token
    };

    // await Tokens.findOne();

    console.log(data)
    try{

        await Tokens.create(data);
    }catch(err){
        console.log(err)
        throw err
    }
    return token;
  }

  
  module.exports = {getKakaoUserInfor,kakaoLogin , generateToken };