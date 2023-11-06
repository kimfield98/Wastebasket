const express = require("express");
const Post = require("../../models/Post");
const router = express.Router();

router.delete("/", async (req, res) => {
  try {
    const postId = req.query.id;
    const deletePost = await Post.deleteOne({ _id: postId });

    if (deletePost.deletedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "게시물이 삭제되었습니다." });
    } else {
      res
        .status(404)
        .json({ success: false, message: "게시물을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
});

module.exports = router;
