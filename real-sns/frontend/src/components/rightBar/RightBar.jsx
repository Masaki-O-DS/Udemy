import React from "react";
import "./RightBar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

const RightBar = ({ profile }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightBar = () => {
    return (
      <>
        <div className="rightbar">
          <img src="assets/star.png" alt="" className="starImg" />
          <span className="eventText">
            <b>フォロワー限定</b>イベント開催中！
          </span>
        </div>
        <img src="assets/ad.jpeg" alt="" className="eventImg" />
        <h4 className="rightbarTitle">オンラインの友達</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online user={user} key={user.id} />
          ))}
          <p className="promotionTitle">プロモーション広告</p>
          <img
            src={PUBLIC_FOLDER + "/promotion/Promotion1.jpeg"}
            alt=""
            className="rightbarPromotionImg"
          />
          <p className="promotionName">ショッピング</p>
          <img
            src={PUBLIC_FOLDER + "/promotion/Promotion2.jpeg"}
            alt=""
            className="rightbarPromotionImg"
          />
          <p className="promotionName">カーショップ</p>
          <img
            src={PUBLIC_FOLDER + "/promotion/Promotion3.jpeg"}
            alt=""
            className="rightbarPromotionImg"
          />
          <p className="promotionName">ShinCode株式会社</p>
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className="rightbarTitle">ユーザー情報</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">出身</span>
            <span className="rightbarInfoKey">福岡</span>
          </div>
          <h4 className="rightbarTitle">あなたの友達</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/1.jpeg"}
                className="rightbarFollowingImg"
                alt=""
              />
              <span className="rightbarFollowingName">Shin Code</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/2.jpeg"}
                className="rightbarFollowingImg"
                alt=""
              />
              <span className="rightbarFollowingName">Yamaki</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/3.jpeg"}
                className="rightbarFollowingImg"
                alt=""
              />
              <span className="rightbarFollowingName">Koga</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/4.jpeg"}
                className="rightbarFollowingImg"
                alt=""
              />
              <span className="rightbarFollowingName">Yosikawa</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default RightBar;
