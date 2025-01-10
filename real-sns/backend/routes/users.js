const User = require("../models/User");
const router = require("express").Router();

//CRUD操作
//ユーザー情報の更新
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("ユーザー情報が更新されました。");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json("あなたはあなたは自分のアカウントのときだけ情報を更新できます");
  }
});

//ユーザー情報の削除
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("ユーザー情報が削除されました。");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json("あなたはあなたは自分のアカウントのときだけ情報を削除できます");
  }
});

//ユーザー情報の取得
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updateAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); //フォローしたい相手のid
      const currentUser = await User.findById(req.body.userId);
      //フォロワーに自分がいなかったらフォローできる
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $push: { following: req.params.id },
        });
        return res.status(200).json("フォローに成功しました。");
      } else {
        return res.status(403).json("あなたはすでにフォローをしています。");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(500).json("自分自身はフォローできません");
  }
});

//ユーザーのフォローを外す
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); //フォローしたい相手のid
      const currentUser = await User.findById(req.body.userId);
      //フォロワーに存在したらフォローをはずせる
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $pull: { following: req.params.id },
        });
        return res.status(200).json("フォロー解除しました。");
      } else {
        return res.status(403).json("このユーザーはフォロー解除できません。");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(500).json("自分自身はフォロー解除できません");
  }
});

module.exports = router;
