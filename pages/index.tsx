import React, { useEffect } from "react";
import { HomeSidebar } from "../components/HomeSidebar";
import { PostItemList } from "../components/PostListItem";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import postService from "../services/postService";
import { getTokenSSRAndCSS } from "../helpers";

export type PostType = {
  PID: string;
  USERID: string;
  fullname: string;
  profilepicture: string;
  url_image: string;
  post_content: string;
  time_added: string;
  status: string;
  count: string | null;
};

type HomeDataProps = {
  listPosts: PostType[];
  userPosts: PostType[];
};

type HomeProps = React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const Home: HomeProps = ({ listPosts, userPosts }) => {
  useEffect(() => {
    console.log({
      listPosts,
      userPosts,
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostItemList listPosts={listPosts} />
        </div>
        <div className="col-lg-4">
          <HomeSidebar userPosts={userPosts} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeDataProps> = async (
  context
) => {
  // Ép kiểu cho thành NextPageContext;
  const ctx = context as unknown as NextPageContext;
  const [token, userToken] = getTokenSSRAndCSS(ctx);
  const userid = userToken?.id;
  const listPostsPos = postService.getPostPaging();
  const userPostsPos = postService.getPostByUserId({ userid, token });
  const [listPostsRes, userPostsRes] = await Promise.all([
    listPostsPos,
    userPostsPos,
  ]);

  const props = {
    listPosts: listPostsRes?.posts || [],
    userPosts: userPostsRes?.posts || [],
  };
  return {
    props,
  };
};

export default Home;
