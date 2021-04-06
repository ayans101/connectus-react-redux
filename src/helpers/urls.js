const API_ROOT = 'http://localhost:8080/api/v1';

export const APIUrls = {
  login: () => `${API_ROOT}/users/create-session`,
  signup: () => `${API_ROOT}/users/register-user`,
  editProfile: (userId) => `${API_ROOT}/users/update/${userId}`,
  fetchPosts: () => `${API_ROOT}/posts/`,
  userProfile: (userId) => `${API_ROOT}/users/${userId}`,
  userFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
};
