import React, { useState } from "react";
import { PostType } from "../../pages";
import postService from "../../services/postService";
import { Button } from "../Button";
import { PostItem } from "../PostItem";

type PropsType = {
  listPosts: PostType[];
};

const pageSize = 3;

const PostListItem: React.FC<PropsType> = (props) => {
  const [listPosts, setListPosts] = useState(props.listPosts);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleLoadMore = () => {
    if (loading) return;
    setLoading(true);
    postService
      .getPostPaging({ pageSize, currentPage: currentPage + 1 })
      .then((res) => {
        if (res.status === 200) {
          const newPosts = res.posts || [];
          setListPosts([...listPosts, ...newPosts]);

          // setState dạng function.
          setCurrentPage((prev) => prev + 1);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="ass1-section__list">
      {listPosts.map((post) => (
        <PostItem post={post} key={post.PID} />
      ))}
      <Button
        isLoading={loading}
        className="load-more ass1-btn"
        onClick={handleLoadMore}
      >
        <span>Xem thêm</span>
      </Button>
    </div>
  );
};

export default PostListItem;
