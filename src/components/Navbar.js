import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LanguageIcon from '@material-ui/icons/Language';
import { Button } from '@material-ui/core';

import { logoutUser } from '../actions/auth';
import { searchUsers, refreshSearchResults } from '../actions/search';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const { searchText } = this.state;

    if (e.target.value) {
      this.props.dispatch(searchUsers(searchText));
    } else {
      this.props.dispatch(refreshSearchResults());
    }

    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { searchText } = this.state;
    const { auth, results } = this.props;

    return (
      // <ThemeProvider theme={theme}>
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
            <input placeholder="Search" onChange={this.handleSearch} />
            {searchText && results.length > 0 && (
              <div className="search-results">
                <ul>
                  {results.map((user) => (
                    <li className="search-results-row" key={user._id}>
                      <Link to={`/user/${user._id}`}>
                        <img
                          src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
                          alt="user-dp"
                        />
                        <span>{user.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {searchText && results.length === 0 && (
              <div className="search-results">
                <ul>
                  <li className="search-results-row">
                    No user registered with this name!
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="right-nav">
            {auth.isLoggedin && (
              <div className="user">
                <Link to="/settings">
                  <img
                    src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
                    alt="user-dp"
                    id="user-dp"
                  />
                </Link>
                <span>{auth.user.name}</span>
              </div>
            )}

            <div className="nav-links">
              <ul>
                {!auth.isLoggedin && (
                  <li>
                    <Button variant="contained" color="primary">
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
                    <Button variant="contained" color="primary">
                      <Link to="/signup">Register</Link>
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      // </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}

export default connect(mapStateToProps)(Navbar);
