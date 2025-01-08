const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//投稿を作成する
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//投稿を削除する
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const contentId = req.body.contentId;
  try {
    const content = await Post.findById(contentId);
    if (content.userId === userId) {
      await content.deleteOne();
      return res.status(200).json("投稿の削除に成功しました。");
    } else {
      res.status(500).json("削除する権限がありません");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//投稿を更新する
router.put("/:id/update", async (req, res) => {
  const userId = req.params.id;
  const contentId = req.body.contentId;
  const updateContent = req.body.desc;
  try {
    const content = await Post.findById(contentId);
    if (content.userId === userId) {
      await content.updateOne({
        $set: {
          desc: updateContent,
        },
      });
      return res.status(200).json(updateContent);
    } else {
      res.status(500).json("更新する権限がありません");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//特定の投稿を取得する
router.get("/:id", async (req, res) => {
  console.log(`GETリクエストを受信: ${req.params.id}`);
  const contentId = req.params.id;
  try {
    const post = await Post.findById(contentId);
    return res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) => {
  try {
    const targetPost = await Post.findById(req.params.id);
    //まだ投稿にいいねを押していなかったらいいねできるようにする
    if (!targetPost.likes.includes(req.body.userId)) {
      await targetPost.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json("いいねしました。");
    } else {
      //いいねをすでに押していたらいいねを外す
      await targetPost.updateOne({
        $pull: { likes: req.body.userId },
      });
      return res.status(403).json("いいねを外しました");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//タイムラインの投稿を取得する
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    //自分がフォローしている友達の投稿内容を全て取得する
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
