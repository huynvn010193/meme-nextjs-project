import React, { useEffect } from "react";
import { HomeSidebar } from "../components/HomeSidebar";
import { PostItemList } from "../components/PostListItem";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

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
  conext
) => {
  const props = {
    listPosts: [],
    userPosts: [],
  };
  return {
    props,
  };
};

export default Home;
