import api from './api';

const postService = {
  getPostPaging: async({ pageSize = 3, currentPage = 1 } = {}) => {
    const params = `pagesize=${pageSize}&currPage=${currentPage}`;
    const url = `/post/getListPagination.php?${params}`;
    return api.callJson(url);
  },
  getPostByUserId: async({ userid, token }) => {
    if(!userid || !token) { 
      return { 
        status: 200, posts: [] 
      }
    };
    const url = `/post/getListPostUserID.php?userid=${userid}`;
    return api.callJson(url, {
      token
    });
  },
  getPostSearch: async({ query }) => {
    return api.callJson( `/post/search.php?query=${encodeURI(query)}` )
  },
  getCategories: async () => {
    return api.callJson('/categories/index.php');
  },
  getPostsPagingByCategory: async({ pageSize = 10, currentPage = 1, tagIndex = "" }) => {
    if(!tagIndex) return null;
    const params = `pagesize=${pageSize}&currPage=${currentPage}&tagIndex=${tagIndex}`;
    const url = `/post/getListByCategory.php?${params}`;
    return api.callJson(url);
  }
}

export default postService;