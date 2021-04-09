import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { logoutUser } from '../actions/auth';
import { fetchUserProfile, refreshProfileState } from '../actions/Profile';
import { APIUrls } from '../helpers/urls';
import { getAuthFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      message: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;

    const {
      match: { params: currentParams },
    } = this.props;

    if (
      prevParams &&
      currentParams &&
      prevParams.userId !== currentParams.userId
    ) {
      this.props.dispatch(fetchUserProfile(currentParams.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    console.log('this.props', this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        message: data.message,
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.removeFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        message: data.message,
      });

      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    console.log('PARAMS', params);
    const user = profile.user;

    if (profile.error) {
      this.props.dispatch(refreshProfileState());
      this.props.dispatch(logoutUser());
      return <Redirect to="/login" />;
    }

    if (profile.inProgress) {
      return <h1>Loading...</h1>;
    }

    const isUserAFriend = this.checkIfUserIsAFriend();
    const { success, error, message } = this.state;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          )}

          {success && <div className="alert success-dailog">{message}</div>}
          {error && <div className="alert error-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}

export default connect(mapStateToProps)(UserProfile);
