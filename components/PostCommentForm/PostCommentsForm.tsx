import { useState } from "react";

type PostCommentsFormProps = {
  handleSubmitForm: (value: string, callback: (e?: Error) => void) => void;
};

const PostCommentsForm: React.FC<PostCommentsFormProps> = ({
  handleSubmitForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const handleChangeComment = (e) => {
    if (e.target.value.length <= 180) {
      setCommentValue(e.target.value);
    } else {
      alert("bạn không thể nhập hơn 180 ký tự");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (commentValue.trim().length !== 0) {
      handleSubmitForm(commentValue, (e) => {
        setLoading(false);
        setCommentValue("");
      });
    } else {
      alert("Vui lòng nhập nội dung bình luận");
    }
  };
  return (
    <div className="ass1-add-comment">
      <form onSubmit={handleSubmit}>
        <input
          value={commentValue}
          onChange={handleChangeComment}
          type="text"
          className="form-control ttg-border-none"
          placeholder="Thêm một bình luận"
        />
      </form>
      <div className="ass1-add-comment__content">
        <a href="#" className="ass1-add-comment__btn-save ass1-btn-icon">
          <span>{180 - commentValue.length}</span>
          <i className="icon-Submit_Tick" onClick={handleSubmit} />
        </a>
      </div>
    </div>
  );
};

export default PostCommentsForm;
