import router from "next/router";
import { useState } from "react";
import { PostDetailForm } from "../../components/PostDetailForm";
import { PostDetailSidebar } from "../../components/PostDetailSidebar";
import { useAuthen } from "../../helpers/useAuthen";
import postService from "../../services/postService";
import { useGlobalState } from "../../state";

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
  const [currentUser] = useGlobalState("currentUser");
  const [loading, setLoading] = useState(false);
  const [token] = useGlobalState("token");
  const onChangeDetailForm = (key: string, value: any) => {
    setPosData({
      ...postData,
      [key]: value,
    });
  };

  const handleSubmitPost = () => {
    setLoading(true);
    postService
      .createNewPost(postData, token)
      .then((res) => {
        if (res.status === 200) {
          alert("Đăng bài viết thành công!");
          router.push(`/user/${currentUser.USERID}`)
        } else {
          alert(res.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm
            url_image={postData.url_image}
            post_content={postData.post_content}
            obj_image={postData.obj_image}
            onChangeDetailForm={onChangeDetailForm}
          />
        </div>
        <div className="col-lg-4">
          <PostDetailSidebar
            loading={loading}
            category={postData.category}
            onChangeDetailForm={onChangeDetailForm}
            handleSubmitPost={handleSubmitPost}
          />
        </div>
      </div>
    </div>
  );
}
