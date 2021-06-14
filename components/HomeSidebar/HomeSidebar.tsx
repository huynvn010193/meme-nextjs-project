import React from "react";
import { PostType } from "../../pages";

type HomeSidebarProps = {
  userPosts: PostType[];
};

const HomeSidebar: React.FC<HomeSidebarProps> = ({ userPosts }) => {
  return (
    <aside className="ass1-aside">
      <div className="ass1-content-head__t">
        <div>Bài viết gần đây của bạn.</div>
      </div>
      <div>
        Vui lòng đăng nhập để xem nội dung này
        <a href="#"> Đăng nhập</a>
      </div>
    </aside>
  );
};

export default HomeSidebar;
