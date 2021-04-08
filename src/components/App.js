import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { refreshAuthState } from '../actions/auth';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { fetchUserFriends } from '../actions/friends';
import { getAuthFromLocalStorage } from '../helpers/utils';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { fetchPosts } from '../actions/posts';
import {
  Home,
  Navbar,
  Page404,
  Login,
  Signup,
  Settings,
  UserProfile,
} from './';

//  update material ui themes with ThemeProvider
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#38b6ff',
      contrastText: '#fff',
    },
  },
});

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(refreshAuthState());

    const token = getAuthFromLocalStorage();

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );

      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Navbar />

            <Switch>
              <Route
                exact
                path="/"
                render={(props) => {
                  return (
                    <Home
                      {...props}
                      posts={posts}
                      friends={friends}
                      isLoggedin={auth.isLoggedin}
                    />
                  );
                }}
              />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute
                path="/settings"
                component={Settings}
                isLoggedin={auth.isLoggedin}
              />
              <PrivateRoute
                path="/user/:userId"
                component={UserProfile}
                isLoggedin={auth.isLoggedin}
              />
              <Route component={Page404} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(App);
