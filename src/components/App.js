import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup, Settings } from './';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { getAuthFromLocalStorage } from '../helpers/utils';

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
    }
  }

  render() {
    const { posts, auth } = this.props;
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
                  return <Home {...props} posts={posts} />;
                }}
              />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute
                path="/settings"
                component={Settings}
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
  };
}

export default connect(mapStateToProps)(App);
