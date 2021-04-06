import { APIUrls } from '../helpers/urls';
import { getAuthFromLocalStorage } from '../helpers/utils';
import { FETCH_FRIENDS_SUCCESS } from './actionTypes';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        dispatch(fetchFriendsSuccess(data.data.friends));
      });
  };
}

export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}
