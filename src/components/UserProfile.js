import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { logoutUser } from '../actions/auth';
import { fetchUserProfile, refreshProfileState } from '../actions/Profile';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
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
            <button className="button save-btn">Add Friend</button>
          ) : (
            <button className="button save-btn">Remove Friend</button>
          )}
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
