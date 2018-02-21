import { GET_POSTS } from '../constants/ActionType';

const GetPosts = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};

export default GetPosts;
