import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { NextPage, NextPageContext } from "next";
import { PostDetailForm } from "../../../components/PostDetailForm";
import { PostDetailSidebar } from "../../../components/PostDetailSidebar";
import { useAuthen } from "../../../helpers/useAuthen";
import postService from "../../../services/postService";
import { useGlobalState } from "../../../state";
import { getTokenSSRAndCSS } from "../../../helpers";
import { PostType } from "../..";
import { TypeCategory } from ".";

type EditPostProps = {
  postDetailData: PostType | null;
  postCategories: TypeCategory[];
};

const EditPostPage: NextPage<EditPostProps> = ({
  postDetailData,
  postCategories,
}) => {
  useAuthen();
  const router = useRouter();
  const [postData, setPosData] = useState(() => {
    return {
      url_image: postDetailData.url_image,
      post_content: postDetailData.post_content,
      category: postCategories.map((cat) => cat.tag_index),
      obj_image: {
        file: null,
        base64: "",
      },
      postid: router.query.postId as string,
    };
  });
  const [currentUser] = useGlobalState("currentUser");
  const [loading, setLoading] = useState(false);
  const [token] = useGlobalState("token");
  const onChangeDetailForm = (key: string, value: any) => {
    if (key === "obj_image") {
      setPosData({
        ...postData,
        [key]: value,
        url_image: "",
      });
      return;
    }
    setPosData({
      ...postData,
      [key]: value,
    });
  };

  const handleSubmitPost = () => {
    setLoading(true);
    postService
      .editPost(postData, token)
      .then((res) => {
        if (res.status === 200) {
          alert("Cập nhật bài viết thành công!");
          setPosData({
            ...postData,
            url_image: res?.data?.post?.url_image,
            obj_image: {
              file: null,
              base64: "",
            },
          });
          router.push(`/user/${currentUser.USERID}`);
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
};

EditPostPage.getInitialProps = async (ctx: NextPageContext) => {
  const [token, userToken] = getTokenSSRAndCSS(ctx);
  const postid = ctx.query.postId as string;
  const postDetailPos = await postService.getPostsByPostId({ postid, token });
  return {
    postDetailData: postDetailPos?.data?.post || null,
    postCategories: postDetailPos?.data?.categories || [],
  };
};

export default EditPostPage;
