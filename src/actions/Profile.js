import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
  REFRESH_PROFILE_STATE,
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getAuthFromLocalStorage } from '../helpers/utils';

export function refreshProfileState() {
  return {
    type: REFRESH_PROFILE_STATE,
  };
}

export function startUserProfileFetch(user) {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailed(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());

    const url = APIUrls.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));
          return;
        }
        dispatch(userProfileFailed(data.message));
      });
  };
}
