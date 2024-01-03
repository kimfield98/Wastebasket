const express = require("express");
const Post = require("../../models/Post");
const User = require("../../models/User");
const router = express.Router(); // express의 Router 사용

router.patch("/", async (req, res) => {
  try {
    const { title, content, id } = req.body;
    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    existingPost.title = title;
    existingPost.content = content;

    await existingPost.save();
    res.status(201).send("게시물 수정 성공");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
