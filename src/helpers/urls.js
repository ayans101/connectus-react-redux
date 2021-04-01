const API_ROOT = 'http://localhost:8080/api/v1';

export const APIUrls = {
  login: () => `${API_ROOT}/users/create-session`,
  fetchPosts: () => `${API_ROOT}/posts/`,
};
