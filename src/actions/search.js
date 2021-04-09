import {
  FETCH_SEARCH_RESULTS_SUCCESS,
  REFRESH_SEARCH_RESULTS,
} from './actionTypes';
import { getAuthFromLocalStorage } from '../helpers/utils';
import { APIUrls } from '../helpers/urls';

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIUrls.userSearch(searchText);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('SEARCH DATA', data);
        if (data.success) {
          dispatch(searchResultsSuccess(data.data.users));
        } else {
          dispatch(searchResultsSuccess([]));
        }
      });
  };
}

export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}

export function refreshSearchResults() {
  return {
    type: REFRESH_SEARCH_RESULTS,
  };
}
