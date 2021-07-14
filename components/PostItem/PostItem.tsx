import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import vilocal from "dayjs/locale/vi";
import { PostType } from "../../pages";
import { hightlightText } from "../../helpers";
import router from "next/router";

type PostItemPros = {
  post?: PostType;
  customClass?: string;
  isHightlight?: boolean;
  query?: string;
  isOwnder?: boolean;
};

dayjs.locale("vi");
dayjs.extend(relativeTime);

const PostItem: React.FC<PostItemPros> = ({
  post,
  customClass,
  isHightlight,
  query,
  isOwnder,
}) => {
  const timeFormat = dayjs(post?.time_added).locale(vilocal).fromNow();
  const defaultClass = "ass1-section__item";
  let classNameCustom = customClass
    ? defaultClass + " " + customClass
    : defaultClass;

  const renderFullName = () => {
    if (isHightlight && query) {
      return hightlightText(post.fullname, query);
    }
    return post.fullname;
  };

  const renderContent = () => {
    if (isHightlight && query) {
      return hightlightText(post.post_content, query);
    }
    return post.post_content;
  };

  const handleClickEdit = (postid: string) => {
    return router.push(`/posts/${postid}/edit`);
  };

  if (!post) return null;

  return (
    <div className={classNameCustom}>
      <div className="ass1-section">
        <div
          className="ass1-section__head"
          style={{ justifyContent: "space-between" }}
        >
          <div style={{ display: "flex" }}>
            <Link href="/user/[userId]" as={`/user/${post.USERID}`}>
              <a className="ass1-section__avatar ass1-avatar">
                <img
                  src={post.profilepicture || "/images/avatar-02.png"}
                  alt={post.fullname}
                />
              </a>
            </Link>
            <div>
              <Link href="/user/[userId]" as={`/user/${post.USERID}`}>
                <a
                  className="ass1-section__name"
                  dangerouslySetInnerHTML={{ __html: renderFullName() }}
                />
              </Link>
              <span className="ass1-section__passed">{timeFormat}</span>
            </div>
          </div>
          {isOwnder && (
            <div>
              <button
                className="ass1-btn"
                onClick={() => handleClickEdit(post.PID)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="ass1-section__content">
          <p dangerouslySetInnerHTML={{ __html: renderContent() }}></p>
          <div className="ass1-section__image">
            <Link href="/posts/[postId]" as={`/posts/${post.PID}`}>
              <a>
                <img src={post.url_image} alt={post.url_image} />
              </a>
            </Link>
          </div>
        </div>
        <div className="ass1-section__footer">
          <Link href="/posts/[postId]" as={`/posts/${post.PID}`}>
            <a className="ass1-section__btn-comment ass1-btn-icon">
              <i className="icon-Comment_Full" />
              <span>{post.count || 0}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
