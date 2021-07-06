import React from "react";
import Masonry from "react-masonry-component";
import { PostType } from "../../pages";
import { PostItem } from "../PostItem";

type UserDetailPostsProps = {
  userDetailPosts: PostType[];
};

const UserDetailPosts: React.FC<UserDetailPostsProps> = ({
  userDetailPosts,
}) => {
  return (
    <Masonry
      className={"ass1-section__wrap row ass1-section__isotope-init"} // default ''
    >
      {userDetailPosts.map((post) => (
        <PostItem post={post} key={post.PID} customClass="col-lg-6" />
      ))}
    </Masonry>
  );
};

export default UserDetailPosts;
