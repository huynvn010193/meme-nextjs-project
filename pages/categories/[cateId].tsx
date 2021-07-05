import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { NextPageContext, NextPage } from "next";
import Masonry from "react-masonry-component";
import { PostType } from "./../index";
import postService from "../../services/postService";
import { PostItem } from "../../components/PostItem";
import { useGlobalState } from "../../state";

interface PropsType {
  listPosts: PostType[];
}

const CategoriesPage: NextPage<PropsType> = ({ listPosts }) => {
  const router = useRouter();
  const categoryId = (router.query.cateId || "") as string;
  const [categories] = useGlobalState("categories");
  useEffect(() => {
    if (!categoryId) {
      router.push("/");
    }
  }, [categoryId]);

  const findText = useMemo(() => {
    const findObj = categories.find((cat) => cat.id === Number(categoryId));
    return findObj?.text || "";
  }, [categories, categoryId]);

  return (
    <div className="container">
      <div className="header-search">
        <h3>
          Danh tìm kiếm: <strong>{findText}</strong>
        </h3>
        <p>Tìm được {listPosts.length} kết quả</p>
      </div>
      <Masonry
        className={"ass1-section__wrap row ass1-section__isotope-init"} // default ''
      >
        {listPosts.map((post) => (
          <PostItem post={post} key={post.PID} customClass="col-lg-6" />
        ))}
      </Masonry>
    </div>
  );
};

CategoriesPage.getInitialProps = async (ctx: NextPageContext) => {
  const tagIndex = (ctx.query.cateId || "") as string;
  const listPostsRes = await postService.getPostsPagingByCategory({ tagIndex });
  return {
    listPosts: listPostsRes?.posts || [],
  };
};

export default CategoriesPage;
