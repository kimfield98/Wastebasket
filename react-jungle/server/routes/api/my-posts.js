const express = require("express");
const Post = require("../../models/Post");
const User = require("../../models/User");
const router = express.Router(); // express의 Router 사용

router.get("/", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(401).json({ message: "인증 실패" });
    }

    const myPosts = await Post.find({ user_id: user._id });

    res.status(200).json(myPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 오류");
  }
});

module.exports = router;
