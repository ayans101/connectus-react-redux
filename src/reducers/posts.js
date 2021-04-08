import {
  ADD_POST,
  UPDATE_POSTS,
  ADD_COMMENT,
  ADD_LIKE_TO_POST,
  REMOVE_LIKE_FROM_POST,
  ADD_LIKE_TO_COMMENT,
  REMOVE_LIKE_FROM_COMMENT,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const updatedPostsList = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return updatedPostsList;
    case ADD_LIKE_TO_POST:
      const _updatedPostsList = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return _updatedPostsList;
    case REMOVE_LIKE_FROM_POST:
      const __updatedPostsList = state.map((post) => {
        if (post._id === action.postId) {
          let newLikes = [...post.likes];
          newLikes.pop(action.userId);
          return {
            ...post,
            likes: [...newLikes],
          };
        }
        return post;
      });
      return __updatedPostsList;
    case ADD_LIKE_TO_COMMENT:
      const ___updatedPostsList = state.map((post) => {
        let found = false;
        let updatedComments = post.comments.map((comment) => {
          if (comment._id === action.commentId) {
            found = true;
            return {
              ...comment,
              likes: [...comment.likes, action.userId],
            };
          }
          return comment;
        });
        if (found) {
          return {
            ...post,
            comments: [...updatedComments],
          };
        } else {
          return post;
        }
      });
      return ___updatedPostsList;
    case REMOVE_LIKE_FROM_COMMENT:
      const ____updatedPostsList = state.map((post) => {
        let found = false;
        let updatedComments = post.comments.map((comment) => {
          if (comment._id === action.commentId) {
            found = true;
            let newLikes = [...comment.likes];
            newLikes.pop(action.userId);
            return {
              ...comment,
              likes: [...newLikes],
            };
          }
          return comment;
        });
        if (found) {
          return {
            ...post,
            comments: [...updatedComments],
          };
        } else {
          return post;
        }
      });
      return ____updatedPostsList;

    default:
      return state;
  }
}
