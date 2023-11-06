const express = require("express");
const login = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User"); // User model 불러오기

login.post("/", async (req, res) => {
  try {
    // DB에서 요청한 Email 찾기
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "email을 다시 확인하세요.",
      });
    }

    // 비밀번호가 같은지 확인
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다",
      });
    }

    // 비밀 번호가 맞으면 Token 생성
    await user.generateToken(); // Promise를 기다립니다.

    // 생성된 토큰을 쿠키에 저장
    res
      .cookie("user_token", user.token, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .status(200)
      .json({ loginSuccess: true, userId: user._id, userToken: user.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ loginSuccess: false, message: "서버 에러" });
  }
});

module.exports = login;
