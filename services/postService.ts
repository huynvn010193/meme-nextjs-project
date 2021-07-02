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
    return api.callJson( `/post/search.php?query=${query}` )
  }
}

export default postService;