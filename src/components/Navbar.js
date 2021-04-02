import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LanguageIcon from '@material-ui/icons/Language';

class Navbar extends React.Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <nav className="nav">
          <div className="left-div">
            <div className="logo">
              <Link to="/">
                <LanguageIcon className="globe-icon" fontSize="small" />
              </Link>
              <Link to="/">{'< ConnectUs />'}</Link>
            </div>
          </div>
          <div className="search-container">
            <img
              className="search-icon"
              src="https://image.flaticon.com/icons/svg/483/483356.svg"
              alt="search-icon"
            />
            <input placeholder="Search" />

            <div className="search-results">
              <ul>
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
                    alt="user-dp"
                  />
                  <span>Arindam</span>
                </li>
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
                    alt="user-dp"
                  />
                  <span>Arpan</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="right-nav">
            {auth.isLoggedin && (
              <div className="user">
                <img
                  src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
                  alt="user-dp"
                  id="user-dp"
                />
                <span>{auth.user.name}</span>
              </div>
            )}

            <div className="nav-links">
              <ul>
                {!auth.isLoggedin && (
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                )}
                {auth.isLoggedin && (
                  <li>
                    <Link to="/logout">Log out</Link>
                  </li>
                )}
                {!auth.isLoggedin && (
                  <li>
                    <Link to="/signup">Register</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Navbar);
