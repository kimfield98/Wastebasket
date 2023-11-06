const express = require("express");
const Post = require("../../models/Post");
const User = require("../../models/User");
const router = express.Router(); // express의 Router 사용

router.post("/", async (req, res) => {
  try {
    const { title, content, date, token } = req.body;
    const user_token = await User.findOne({ token: token });
    const newPost = new Post({
      title,
      content,
      date,
      user_id: user_token._id,
    });

    await newPost.save();
    res.status(201).send("게시물 작성 성공");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
