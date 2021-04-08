const API_ROOT = 'http://localhost:8080/api/v1';

export const APIUrls = {
  login: () => `${API_ROOT}/users/create-session`,
  signup: () => `${API_ROOT}/users/register-user`,
  editProfile: (userId) => `${API_ROOT}/users/update/${userId}`,
  fetchPosts: () => `${API_ROOT}/posts/`,
  userProfile: (userId) => `${API_ROOT}/users/${userId}`,
  userFriends: () => `${API_ROOT}/friendship/fetch-user-friends`,
  addFriend: (userId) => `${API_ROOT}/friendship/create-friendship/${userId}`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove-friendship/${userId}`,
  createPost: () => `${API_ROOT}/posts/create`,
  createComment: () => `${API_ROOT}/comments/create`,
};
