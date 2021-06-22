import React from "react";
import Link from "next/link";
import { PostType } from "../../pages";
import { useGlobalState } from "../../state";
import { PostItem } from "../PostItem";

type HomeSidebarProps = {
  userPosts: PostType[];
};

const HomeSidebar: React.FC<HomeSidebarProps> = ({ userPosts }) => {
  const [userInfo] = useGlobalState("currentUser");

  const renderUserPost = () => {};
  return (
    <aside className="ass1-aside">
      <div className="ass1-content-head__t">
        <div>Bài viết gần đây của bạn.</div>
      </div>
      {userInfo ? (
        userPosts.length === 0 ? (
          <p>
            Bạn chưa đăng bài viết nào cả, Truy cập{" "}
            <Link href="/post/create">
              <a>Link</a>
            </Link>{" "}
            để đăng bài viết
          </p>
        ) : (
          userPosts.map((post) => <PostItem key={post.PID} post={post} />)
        )
      ) : (
        <div>
          Vui lòng đăng nhập để xem nội dung này
          <Link href="/login">
            <a> Đăng nhập</a>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default HomeSidebar;
