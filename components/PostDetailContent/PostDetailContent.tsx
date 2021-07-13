import "./PostDetailContent.scss";
import Link from "next/link";
import { PostCommentsForm } from "../PostCommentForm";
import { PostCommentsList } from "../PostCommentsList";
import { PostItem } from "../PostItem";
import { PostType } from "../../pages";
import { TypeCategory, TypeComment } from "../../pages/posts/[postId]";

type PostDetailContentProp = {
  postDetail: PostType;
  postCategories: TypeCategory[];
  listComments?: TypeComment[];
};

const PostDetailContent: React.FC<PostDetailContentProp> = ({
  postDetail,
  postCategories,
  listComments,
}) => {
  return (
    <div className="ass1-section__list">
      <PostItem post={postDetail} />
      <div className="list-categories">
        <h5>
          <strong>Danh mục: </strong>
        </h5>
        <ul>
          {/* <li key="1">
            <a href="#">Running man</a>
          </li>
          <li key="2">
            <a href="#">Ảnh bựa</a>
          </li>
          <li key="3">
            <a href="#">FapTV</a>
          </li>
          <li key="4">
            <a href="#">Video cảm động</a>
          </li> */}
          {postCategories.map((obj) => {
            return (
              <li key={obj.TAG_ID}>
                <Link
                  href="/categories/[cateId]"
                  as={`/categories/${obj.tag_index}`}
                >
                  <a href="/">{obj.tag_value}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <PostCommentsForm />
      <PostCommentsList listComments={listComments} />
    </div>
  );
};

export default PostDetailContent;
