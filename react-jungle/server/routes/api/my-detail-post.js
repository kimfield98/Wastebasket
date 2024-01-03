const express = require("express");
const Post = require("../../models/Post");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const post_id = req.query.id;
    const post = await Post.findOne({ _id: post_id });
    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 오류");
  }
});

module.exports = router;
