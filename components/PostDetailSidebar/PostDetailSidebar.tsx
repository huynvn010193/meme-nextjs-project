import { useGlobalState } from "../../state";
import { Button } from "../Button";

type PostDetailSidebarProps = {
  category: string[];
  onChangeDetailForm: (key: string, category: string[]) => void;
  handleSubmitPost: () => void;
  loading: boolean;
};

const PostDetailSidebar: React.FC<PostDetailSidebarProps> = ({
  category,
  onChangeDetailForm,
  handleSubmitPost,
  loading,
}) => {
  const [listCategories] = useGlobalState("categories");

  const handleOnChange = (e) => {
    const isCheck = e.target.checked;
    const value = e.target.value;
    const findIdx = category.findIndex((cateId) => cateId === value);
    const isExisting = findIdx !== -1;
    if (!isExisting && isCheck) {
      onChangeDetailForm("category", [...category, value]);
    } else if (!isCheck) {
      onChangeDetailForm(
        "category",
        category.filter((id) => id !== value)
      );
    }
  };

  return (
    <aside className="ass1-aside ass1-aside__edit-post">
      <div>
        <Button
          className="ass1-btn"
          onClick={handleSubmitPost}
          isLoading={loading}
          type="submit"
        >
          Đăng bài
        </Button>
      </div>
      <div className="ass1-aside__edit-post-head">
        <span style={{ display: "block", width: "100%", marginBottom: "10px" }}>
          Chọn danh mục
        </span>
        {listCategories.map((cate) => {
          return (
            <label className="ass1-checkbox" key={cate.id}>
              <input
                type="checkbox"
                name="category"
                value={cate.id}
                onChange={handleOnChange}
              />
              <span />
              <p>{cate.text}</p>
            </label>
          );
        })}
      </div>
      <div className="ass1-aside__get-code">
        <p>Share Link</p>
      </div>
      <div className="ass1-aside__social">
        <a href="/" className="ass1-btn-social__facebook ass1-btn-social">
          <i className="fa fa-facebook" aria-hidden="true" />
        </a>
        <a href="/" className="ass1-btn-social__twitter ass1-btn-social">
          <i className="fa fa-twitter" aria-hidden="true" />
        </a>
        <a href="/" className="ass1-btn-social__google ass1-btn-social">
          <i className="fa fa-google-plus" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
};

export default PostDetailSidebar;
