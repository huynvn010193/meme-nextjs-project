import { PostCommentsForm } from "../PostCommentForm";
import { PostCommentsList } from "../PostCommentsList";
import { PostItem } from "../PostItem";

const PostDetailContent = () => {
  return (
    <div className="ass1-section__list">
      {/* <PostItem /> */}
      <PostCommentsForm />
      <PostCommentsList />
    </div>
  );
};

export default PostDetailContent;
