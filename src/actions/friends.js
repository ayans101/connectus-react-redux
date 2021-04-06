import { APIUrls } from '../helpers/urls';
import { getAuthFromLocalStorage } from '../helpers/utils';
import { FETCH_FRIENDS_SUCCESS, ADD_FRIEND } from './actionTypes';

export function fetchUserFriends() {
  return (dispatch) => {
    const url = APIUrls.userFriends();
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('data', data);
          dispatch(fetchFriendsSuccess(data.data.friends));
        }
      });
  };
}

export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}
