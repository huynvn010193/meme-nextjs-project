import dayjs from "dayjs";
import vilocal from "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { TypeComment } from "../../pages/posts/[postId]";

type PostCommentsListProps = {
  listComments: TypeComment[];
};

dayjs.locale("vi");
dayjs.extend(relativeTime);

const PostCommentsList: React.FC<PostCommentsListProps> = ({
  listComments,
}) => {
  return (
    <div>
      <div className="ass1-comments__head">
        <div className="ass1-comments__title">214 Bình luận</div>
        <div className="ass1-comments__options">
          <span>Sắp xếp theo:</span>
          <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon">
            <i className="icon-Upvote" />
          </a>
          <a href="#" className="ass1-comments__btn-down ass1-btn-icon">
            <i className="icon-Downvote" />
          </a>
          <a href="#" className="ass1-comments__btn-expand ass1-btn-icon">
            <i className="icon-Expand_all" />
          </a>
        </div>
      </div>
      {/*comment*/}
      {listComments.map((comment) => {
        const timeFormat = dayjs(comment?.time_added).locale(vilocal).fromNow();
        return (
          <div className="ass1-comments__section" key={comment.CID}>
            <Link href="/user/[userId]" as={`/user/${comment.USERID}`}>
              <a className="ass1-comments__avatar ass1-avatar">
                <img
                  src={comment.profilepicture || "/images/avatar-02.png"}
                  alt=""
                />
              </a>
            </Link>
            <div className="ass1-comments__content">
              <Link href="/user/[userId]" as={`/user/${comment.USERID}`}>
                <a
                  className="ass1-comments__name"
                  style={{ paddingRight: "10px" }}
                >
                  {comment.fullname}
                </a>
              </Link>

              <span className="ass1-comments__passed">{timeFormat}</span>
              <p>{comment.comment}</p>
              <div className="ass1-comments__info">
                <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon">
                  <i className="icon-Upvote" />
                  <span>901</span>
                </a>
                <a href="#" className="ass1-comments__btn-down ass1-btn-icon">
                  <i className="icon-Downvote" />
                  <span>36</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {/*comment*/}
    </div>
  );
};

export default PostCommentsList;
