import React from "react";
import "./Home.css";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import { TimeLine } from "../../components/timeLine/TimeLine";
import RightBar from "../../components/rightBar/RightBar";

const Home = () => {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <SideBar />
        <TimeLine />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
