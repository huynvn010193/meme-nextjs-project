import { useState } from "react";
import { PostDetailForm } from "../../components/PostDetailForm";
import { PostDetailSidebar } from "../../components/PostDetailSidebar";
import { useAuthen } from "../../helpers/useAuthen";

const iniState = {
  url_image: "",
  post_content: "",
  category: [],
  obj_image: {
    file: null,
    base64: "",
  },
};

export default function PostCreate() {
  useAuthen();
  const [postData, setPosData] = useState(iniState);
  const onChangeCategory = (newCategory: string[]) => {
    setPosData({
      ...postData,
      category: newCategory,
    })
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm />
        </div>
        <div className="col-lg-4">
          <PostDetailSidebar category={postData.category} onChangeCategory={onChangeCategory} />
        </div>
      </div>
    </div>
  );
}
