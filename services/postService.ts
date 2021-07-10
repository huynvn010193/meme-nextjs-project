import { type } from "node:os";
import api from "./api";

type ObjImage = {
  file: File | null;
  base64: string;
}

type TypePostCreate = {
  post_content: string,
  url_image: string,
  category: string[],
  obj_image: ObjImage,
}

const postService = {
  getPostPaging: async ({ pageSize = 3, currentPage = 1 } = {}) => {
    const params = `pagesize=${pageSize}&currPage=${currentPage}`;
    const url = `/post/getListPagination.php?${params}`;
    return api.callJson(url);
  },
  getPostByUserId: async ({ userid, token }) => {
    if (!userid || !token) {
      return {
        status: 200,
        posts: [],
      };
    }
    const url = `/post/getListPostUserID.php?userid=${userid}`;
    return api.callJson(url, {
      token,
    });
  },
  getPostSearch: async ({ query }) => {
    return api.callJson(`/post/search.php?query=${encodeURI(query)}`);
  },
  getCategories: async () => {
    return api.callJson("/categories/index.php");
  },
  getPostsPagingByCategory: async ({
    pageSize = 10,
    currentPage = 1,
    tagIndex = "",
  }) => {
    if (!tagIndex) return null;
    const params = `pagesize=${pageSize}&currPage=${currentPage}&tagIndex=${tagIndex}`;
    const url = `/post/getListByCategory.php?${params}`;
    return api.callJson(url);
  },
  createNewPost: async ({ post_content, url_image, category, obj_image}: TypePostCreate, token: string) => {
    const url = '/post/addNew.php';
    const data = new FormData();
    data.append("post_content", post_content);
    data.append("category", category.toString());
    data.append("url_image", url_image);

    if(obj_image.file) {
      data.append("obj_image",obj_image.file);
    }

    return api.callFormData(url,{data, token});
  }
};

export default postService;
