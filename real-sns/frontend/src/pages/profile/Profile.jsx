import React from "react";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import { TimeLine } from "../../components/timeLine/TimeLine";
import RightBar from "../../components/rightBar/RightBar";
import "./Profile.css";

const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <TopBar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={PUBLIC_FOLDER + "/post/3.jpeg"}
                className="profileCoverImg"
                alt=""
              />
              <img
                src={PUBLIC_FOLDER + "/person/1.jpeg"}
                className="profileUserImg"
                alt=""
              />
              <div className="profileInfo">
                <h4 className="profileInfoName">Shin Code</h4>
                <span className="profileInfoDesc">Udemy講師です</span>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine />
            <RightBar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
