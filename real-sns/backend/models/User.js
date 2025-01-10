const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String, //データのタイプ
      required: true, //このデータは必須であることを指す
      min: 3, //最小の文字数
      max: 24, //最大の文字数,
      unique: true, //重複は許さない
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    profilePicture: {
      type: String,
      default: "", //デフォルトを空にする 文字列のパスを指定することになる。
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array, //フォロワーは、どんどん増えると思うので配列で用意
      default: [],
    },
    following: {
      //フォローしている人
      type: Array,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 70,
    },
    city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true } //データを格納した時のタイムスタンプを自動的に保存する
);

module.exports = mongoose.model("User", UserSchema);
