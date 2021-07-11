import { NextPage, NextPageContext } from "next";
import { PostType } from "..";
import { HomeSidebar } from "../../components/HomeSidebar";
import { PostDetailContent } from "../../components/PostDetailContent";
import { getTokenSSRAndCSS } from "../../helpers";
import postService from "../../services/postService";
import { TypeUser } from "../../state";

export type TypeCategory = {
  TAG_ID: string;
  PID: string;
  tag_index: string;
  tag_value: string;
};

type PostDetailProps = {
  postDetail: PostType;
  postCategories: TypeCategory[];
  userPosts: PostType[];
};

const PostDetail: NextPage<PostDetailProps> = ({
  postDetail,
  postCategories,
  userPosts,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent
            postDetail={postDetail}
            postCategories={postCategories}
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
  const [userPostsRes, postDetailRes] = await Promise.all([
    userPostsPos,
    postDetailPos,
  ]);

  return {
    postDetail: postDetailRes?.data?.post || [],
    postCategories: postDetailRes?.data?.categories || [],
    userPosts: userPostsRes?.posts || [],
  };
};

export default PostDetail;
