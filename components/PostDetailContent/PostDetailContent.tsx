import "./PostDetailContent.scss";
import Link from "next/link";
import { PostCommentsForm } from "../PostCommentForm";
import { PostCommentsList } from "../PostCommentsList";
import { PostItem } from "../PostItem";
import { PostType } from "../../pages";
import { TypeCategory, TypeComment } from "../../pages/posts/[postId]";
import { useState } from "react";
import postService from "../../services/postService";
import { useRouter } from "next/router";
import { useGlobalState } from "../../state";

type PostDetailContentProp = {
  postDetail: PostType;
  postCategories: TypeCategory[];
  listComments?: TypeComment[];
};

const PostDetailContent: React.FC<PostDetailContentProp> = ({
  postDetail,
  postCategories,
  listComments: initListComment,
}) => {
  const [listComments, setListComments] = useState(initListComment);
  const router = useRouter();
  const postid = router.query.postId as string;
  const [token] = useGlobalState("token");
  const handleSubmitForm = async (commnetValue: string) => {
    try {
      const result = await postService.postComment(postid, commnetValue, token);
      if (result.status !== 200) throw new Error("Đăng bình luận không thành công!");
      const listCmtRes = await postService.getCommentById(postid);
      if (result.status === 200) {
        setListComments(listCmtRes.comments);
      }
    } catch (e) {
      // Khi throw Error thì chạy vào trong catch
    }
  }
  return (
    <div className="ass1-section__list">
      <PostItem post={postDetail} />
      <div className="list-categories">
        <h5>
          <strong>Danh mục: </strong>
        </h5>
        <ul>
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
      <PostCommentsForm handleSubmitForm={handleSubmitForm} />
      <PostCommentsList listComments={listComments} />
    </div>
  );
};

export default PostDetailContent;
