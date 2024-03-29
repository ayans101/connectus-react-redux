import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { editUser, refreshAuthState, logoutUser } from '../actions/auth';
import { fetchPosts } from '../actions/posts';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: false,
    };
  }

  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };

  handleSave = () => {
    const { password, confirmPassword, name } = this.state;
    const { user } = this.props.auth;
    if (name && password && confirmPassword && password === confirmPassword) {
      this.props.dispatch(editUser(name, password, confirmPassword, user._id));
    } else {
      alert(`Name field is blank or passwords don't match`);
    }
  };

  componentWillUnmount() {
    const { error } = this.props.auth;
    if(error){
      alert("Your token has expired...!");
    }
    this.props.dispatch(refreshAuthState());
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { user, auth, error } = this.props.auth;
    if(error){
      this.props.dispatch(refreshAuthState());
      this.props.dispatch(logoutUser());
      return <Redirect to="/login" />;
    }
    const { editMode } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="/user-dp.png"
            alt="user-dp"
          />
        </div>
        {error && <div className="alert error-dailog">{auth.error}</div>}
        {error === false && (
          <div className="alert success-dailog">
            Profile updated successfully!
          </div>
        )}
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('name', e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>

        {editMode && (
          <div className="field">
            <div className="field-label">New Password</div>

            <input
              type="password"
              onChange={(e) => this.handleChange('password', e.target.value)}
              value={this.state.password}
            />
          </div>
        )}

        {editMode && (
          <div className="field">
            <div className="field-label">Confirm Password</div>

            <input
              type="password"
              onChange={(e) =>
                this.handleChange('confirmPassword', e.target.value)
              }
              value={this.state.confirmPassword}
            />
          </div>
        )}

        <div className="btn-grp">
          {editMode ? (
            <button className="button save-btn" onClick={this.handleSave}>
              Save
            </button>
          ) : (
            <button
              className="button edit-btn"
              onClick={() => this.handleChange('editMode', true)}
            >
              Edit Profile
            </button>
          )}

          {editMode && (
            <div
              className="go-back"
              onClick={() => this.handleChange('editMode', false)}
            >
              Go back
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Settings);
