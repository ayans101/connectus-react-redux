import React, { Component } from 'react';

class UserProfile extends Component {
  render() {
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
          <div className="field-value">Abstract</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">abs@gmail.com</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

export default UserProfile;
