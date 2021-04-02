import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LanguageIcon from '@material-ui/icons/Language';
import { Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
// import { white } from '@material-ui/core/colors';

import { logoutUser } from '../actions/auth';

//  update material ui themes with ThemeProvider
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#38b6ff',
      contrastText: '#fff',
    },
  },
});

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };
  render() {
    const { auth } = this.props;
    return (
      <ThemeProvider theme={theme}>
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
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.logOut}
                      >
                        <Link to="/login">Log in</Link>
                      </Button>
                    </li>
                  )}
                  {auth.isLoggedin && (
                    <li>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.logOut}
                      >
                        Log out
                      </Button>
                    </li>
                  )}
                  {!auth.isLoggedin && (
                    <li>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.logOut}
                      >
                        <Link to="/signup">Register</Link>
                      </Button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Navbar);
