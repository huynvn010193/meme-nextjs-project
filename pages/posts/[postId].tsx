import { NextPage, NextPageContext } from "next";
import { PostType } from "..";
import { HomeSidebar } from "../../components/HomeSidebar";
import { PostDetailContent } from "../../components/PostDetailContent";
import { getTokenSSRAndCSS } from "../../helpers";
import postService from "../../services/postService";

type PostDetailProps = {
  listPosts: PostType[];
  userPosts: PostType[];
}

const PostDetail: NextPage<PostDetailProps> = ({ listPosts, userPosts }) => {
  console.log("🚀 ~ file: [postId].tsx ~ line 14 ~ userPosts", userPosts);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent />
        </div>
        <div className="col-lg-4">
          <HomeSidebar userPosts={userPosts} />
        </div>
      </div>
    </div>
  );
}

PostDetail.getInitialProps = async (ctx: NextPageContext) => {
  const [token, userToken] = getTokenSSRAndCSS(ctx);
  const userid = userToken?.id;
  const postId = ctx.query.postId;
  const listPostsPos = postService.getPostPaging();
  const userPostsPos = postService.getPostByUserId({ userid, token });
  const [listPostsRes, userPostsRes] = await Promise.all([
    listPostsPos,
    userPostsPos,
  ]);
  return {
    listPosts: listPostsRes?.posts || [],
    userPosts: userPostsRes?.posts || [],
  }
}

export default PostDetail;