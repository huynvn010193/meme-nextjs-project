import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPageContext, NextPage } from "next";
import Masonry from "react-masonry-component";
import { PostType } from "./index";
import postService from "../services/postService";
import { PostItem } from "../components/PostItem";

interface PropsType {
  listPosts: PostType[];
}

const SearchPage: NextPage<PropsType> = ({ listPosts }) => {
  const router = useRouter();
  const searchStr = router.query.q || "";
  useEffect(() => {
    if (!searchStr) {
      router.push("/");
    }
  }, [searchStr]);
  return (
    <div className="container">
      <div className="header-search">
        <h3>
          Từ khóa tìm kiếm: <strong>{searchStr}</strong>
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

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  const query = ctx.query.q || "";
  const listPostsRes = await postService.getPostSearch({ query });
  return {
    listPosts: listPostsRes?.posts || [],
  };
};

export default SearchPage;
