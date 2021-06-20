import Link from 'next/link';
import { PostType } from "../../pages";

type PostItemPros = {
  post: PostType
}

const PostItem: React.FC<PostItemPros> = ({ post }) => {
  console.log("post.USERID", post.USERID);

  return (
    <div className="ass1-section__item">
      <div className="ass1-section">
        <div className="ass1-section__head">
          <Link href="/user/[userId]" as={`/user/${post.USERID}`}>
            <a
              className="ass1-section__avatar ass1-avatar"
            >
              <img src={post.profilepicture || "/images/avatar-02.png"} alt={post.fullname} />
            </a>
          </Link>
          <div>
            <Link href="/user/[userId]" as={`/user/${post.USERID}`}>
              <a className="ass1-section__name">{post.fullname}</a>
            </Link>
            <span className="ass1-section__passed">2 giờ trước</span>
          </div>
        </div>
        <div className="ass1-section__content">
          <p>{post.post_content}</p>
          <div className="ass1-section__image">
            <Link href="/posts/[postId]" as={`/posts/${post.PID}`}>
              <a>
                <img src={post.url_image} alt={post.url_image} />
              </a>
            </Link>
          </div>
        </div>
        <div className="ass1-section__footer">
          <a href="#" className="ass1-section__btn-comment ass1-btn-icon">
            <i className="icon-Comment_Full" />
            <span>{post.count}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
