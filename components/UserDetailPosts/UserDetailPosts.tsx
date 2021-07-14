import React from "react";
import Masonry from "react-masonry-component";
import { PostType } from "../../pages";
import { TypeUser, useGlobalState } from "../../state";
import { PostItem } from "../PostItem";

type UserDetailPostsProps = {
  userDetailPosts: PostType[];
  userDetailInfo: TypeUser;
};

const UserDetailPosts: React.FC<UserDetailPostsProps> = ({
  userDetailPosts,
  userDetailInfo,
}) => {
  const [currentUser] = useGlobalState("currentUser");
  if (!userDetailInfo) return null;
  const checkUser = currentUser?.USERID === userDetailInfo.USERID;
  return (
    <Masonry
      className={"ass1-section__wrap row ass1-section__isotope-init"} // default ''
    >
      {userDetailPosts.map((post) => (
        <PostItem
          post={post}
          key={post.PID}
          customClass="col-lg-6"
          isOwnder={checkUser}
        />
      ))}
    </Masonry>
  );
};

export default UserDetailPosts;
