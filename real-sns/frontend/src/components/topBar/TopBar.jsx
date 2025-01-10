import { Chat, Notifications, Search } from "@mui/icons-material";
import React from "react";
import "./TopBar.css";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="topbarContainer">
      {/* 左側 */}
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Real SNS</span>
        </Link>
      </div>

      {/* 中央 */}
      <div className="topbarCenter">
        <div className="seachbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="探しものは何ですか？"
          />
        </div>
      </div>

      {/* 右側 */}
      <div className="topbarRight">
        <div className="topbarItemIcons">
          <div className="topbarIcontItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIcontItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div>
          <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
