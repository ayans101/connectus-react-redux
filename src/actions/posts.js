import { APIUrls } from '../helpers/urls';
import {
  ADD_POST,
  UPDATE_POSTS,
  ADD_COMMENT,
  ADD_LIKE_TO_POST,
  REMOVE_LIKE_FROM_POST,
  ADD_LIKE_TO_COMMENT,
  REMOVE_LIKE_FROM_COMMENT,
} from './actionTypes';
import { getAuthFromLocalStorage, getFormBody } from '../helpers/utils';

export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        //   console.log('response', response);
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data', data);
        dispatch(updatePosts(data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA', data);

        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addLike(id, likeType, userId, pId) {
  return (dispatch) => {
    const url = APIUrls.toggleLike(id, likeType);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('LIKE DATA', data);
        if (data.success) {
          if (likeType === 'Post' && !data.data.deleted)
            dispatch(addLikeToPost(id, userId));
          if (likeType === 'Post' && data.data.deleted) {
            dispatch(removeLikeFromPost(id, userId));
          }
          if (likeType === 'Comment' && !data.data.deleted)
            dispatch(addLikeToComment(id, userId, pId));
          if (likeType === 'Comment' && data.data.deleted) {
            dispatch(removeLikeFromComment(id, userId, pId));
          }
        }
      });
  };
}

export function addLikeToPost(postId, userId) {
  return {
    type: ADD_LIKE_TO_POST,
    postId,
    userId,
  };
}

export function removeLikeFromPost(postId, userId) {
  return {
    type: REMOVE_LIKE_FROM_POST,
    postId,
    userId,
  };
}

export function addLikeToComment(commentId, userId, postId) {
  return {
    type: ADD_LIKE_TO_COMMENT,
    commentId,
    userId,
    postId,
  };
}

export function removeLikeFromComment(commentId, userId, postId) {
  return {
    type: REMOVE_LIKE_FROM_COMMENT,
    commentId,
    userId,
    postId,
  };
}
