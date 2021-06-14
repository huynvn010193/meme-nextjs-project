import React from "react";
import { PostType } from "../../pages";
import { PostItem } from "../PostItem";

type PropsType = {
  listPosts: PostType[];
};

const PostListItem: React.FC<PropsType> = ({ listPosts }) => {
  return (
    <div className="ass1-section__list">
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <button className="load-more ass1-btn">
        <span>Xem thêm</span>
      </button>
    </div>
  );
};

export default PostListItem;
