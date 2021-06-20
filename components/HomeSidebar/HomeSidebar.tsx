import React from "react";
import Link from 'next/link';
import { PostType } from "../../pages";
import { useGlobalState } from "../../state";

type HomeSidebarProps = {
  userPosts: PostType[];
};

const HomeSidebar: React.FC<HomeSidebarProps> = ({ userPosts }) => {
  const [userInfo] = useGlobalState("currentUser");
  return (
    <aside className="ass1-aside">
      <div className="ass1-content-head__t">
        <div>Bài viết gần đây của bạn.</div>
      </div>
      {
        userInfo ? (
          <div>List Item</div>
        ) : (
          <div>
            Vui lòng đăng nhập để xem nội dung này
            <Link href="/login">
              <a> Đăng nhập</a>
            </Link>
          </div>
        )
      }
    </aside>
  );
};

export default HomeSidebar;
