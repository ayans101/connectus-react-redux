import {
  USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  REFRESH_PROFILE_STATE
} from '../actions/actionTypes';

const initialProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: false,
};

export default function profile(state = initialProfileState, action) {
  switch (action.type) {
    case REFRESH_PROFILE_STATE:
      return {
        ...state,
        error: null,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        success: true,
        user: action.user,
        inProgress: false,
        error: null,
      };
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        inProgress: true,
        error: null,
      };
    default:
      return state;
  }
}
