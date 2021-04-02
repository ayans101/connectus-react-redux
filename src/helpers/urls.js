const API_ROOT = 'http://localhost:8080/api/v1';

export const APIUrls = {
  login: () => `${API_ROOT}/users/create-session`,
  signup: () => `${API_ROOT}/users/register-user`,
  fetchPosts: () => `${API_ROOT}/posts/`,
};
