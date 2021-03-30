import React from 'react';
import { connect } from 'react-redux';
import { PostsList } from './';
import PropTypes from 'prop-types';
import LanguageIcon from '@material-ui/icons/Language';

import { fetchPosts } from '../actions/posts';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <nav className="nav">
          <div className="left-div">
            <div className="logo">
              <LanguageIcon className="globe-icon" fontSize="medium" />
              {'< ConnectUs />'}
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
                  <span>Aryan</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="right-nav">
            <div className="user">
              <img
                src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
                alt="user-dp"
                id="user-dp"
              />
              <span>Abstract</span>
            </div>
            <div className="nav-links">
              <ul>
                <li>Log in</li>
                <li>Log out</li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </nav>
        <PostsList posts={posts} />
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(App);
