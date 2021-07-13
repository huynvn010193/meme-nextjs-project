import { NextPage, NextPageContext } from "next";
import { PostType } from "..";
import { HomeSidebar } from "../../components/HomeSidebar";
import { PostDetailContent } from "../../components/PostDetailContent";
import { getTokenSSRAndCSS } from "../../helpers";
import postService from "../../services/postService";
import userService from "../../services/userService";

export type TypeCategory = {
  TAG_ID: string;
  PID: string;
  tag_index: string;
  tag_value: string;
};

export type TypeComment = {
  CID: string;
  PID: string;
  USERID: string;
  fullname: string;
  profilepicture: string;
  comment: string;
  time_added: string;
};

type PostDetailProps = {
  postDetail: PostType;
  postCategories: TypeCategory[];
  userPosts: PostType[];
  comments: TypeComment[];
};

const PostDetail: NextPage<PostDetailProps> = ({
  postDetail,
  postCategories,
  userPosts,
  comments,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent
            postDetail={postDetail}
            postCategories={postCategories}
            listComments={comments}
          />
        </div>
        <div className="col-lg-4">
          <HomeSidebar userPosts={userPosts} />
        </div>
      </div>
    </div>
  );
};

PostDetail.getInitialProps = async (ctx: NextPageContext) => {
  const [token, userToken] = getTokenSSRAndCSS(ctx);
  const userid = userToken?.id;
  const postid = ctx.query.postId;
  const userPostsPos = postService.getPostByUserId({ userid, token });
  const postDetailPos = postService.getPostsByPostId({ postid, token });
  const commnetsPos = postService.getCommentById(postid);
  const [userPostsRes, postDetailRes, commentRes] = await Promise.all([
    userPostsPos,
    postDetailPos,
    commnetsPos,
  ]);

  const posUserId = postDetailRes?.data?.post?.USERID || "";
  const userInfoData = await userService.getUserById(posUserId);

  let postDetail = null;
  if (postDetailRes?.data?.post) {
    postDetail = {
      ...postDetailRes?.data?.post,
      fullname: userInfoData?.user?.fullname,
      profilepicture: userInfoData?.user?.profilepicture,
    };
  }

  return {
    postDetail,
    postCategories: postDetailRes?.data?.categories || [],
    userPosts: userPostsRes?.posts || [],
    comments: commentRes?.comments || [],
  };
};

export default PostDetail;
