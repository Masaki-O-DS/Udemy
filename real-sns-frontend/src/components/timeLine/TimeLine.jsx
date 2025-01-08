import React from "react";
import "./TimeLine.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { Posts } from "../../dummyData";

export const TimeLine = () => {
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {/* <Post /> */}
        {Posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
