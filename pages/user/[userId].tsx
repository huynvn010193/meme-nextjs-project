import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PostType } from "..";
import { UserDetailInfo } from "../../components/UserDetailInfo";
import { UserDetailPosts } from "../../components/UserDetailPosts";
import { getTokenSSRAndCSS } from "../../helpers";
import { useAuthen } from "../../helpers/useAuthen";
import postService from "../../services/postService";
import userService from "../../services/userService";
import { TypeUser } from "../../state";

type UserDetailProps = {
  userDetailInfo: TypeUser;
  userDetailPosts: PostType[];
};

const UserDetail: NextPage<UserDetailProps> = ({
  userDetailInfo,
  userDetailPosts,
}) => {
  useAuthen();
  const router = useRouter();
  useEffect(() => {
    if (!userDetailInfo) {
      alert("user không tồn tại");
      router.push("/");
    }
  }, [userDetailInfo]);

  return (
    <div className="container">
      <UserDetailInfo
        userDetailInfo={userDetailInfo}
        postCount={userDetailPosts.length}
      />
      <UserDetailPosts
        userDetailPosts={userDetailPosts}
        userDetailInfo={userDetailInfo}
      />
    </div>
  );
};

UserDetail.getInitialProps = async (ctx: NextPageContext) => {
  const userid = ctx.query.userId as string;
  const [token] = getTokenSSRAndCSS(ctx);
  const userPos = userService.getUserById(userid);
  const postPos = postService.getPostByUserId({ userid, token });
  const [userRes, postRes] = await Promise.all([userPos, postPos]);
  return {
    userDetailInfo: userRes?.user || null,
    userDetailPosts: postRes?.posts || [],
  };
};

export default UserDetail;
