import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';

// import config from '../config/routes';
// Views
import NotFound from '../views/404';
import Home from '../views/Home';
// import Stream from '../views/Stream';
// import PostView from '../views/Post';
// // import Posts from '../views/Posts';
// // import Preview from '../Preview';
// import Page from '../views/Page';

const components = {
  Home,
  // Stream,
  NotFound,
};

const PROP_TYPES = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object,
  }).isRequired,
  prismicCtx: PropTypes.object,
  stream: PropTypes.object,
  overlayWidth: PropTypes.number,
};

const DEFAULT_PROPS = {
  prismicCtx: {},
  location: {},
  stream: {},
  overlayWidth: 0.5,
};

const Router = (props) => {
  const {
    location,
    overlayWidth,
    prismicCtx,
    stream,
  } = props;

// class Router extends React.Component { // C
//   render() { // C
//     const { location } = this.props; // C

    return (
      <Switch location={location}>
        {/* {config.map((route, routes, i) => {
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact || true}
              component={components[route.component]}
            />
          );
        })} */}

        {/*
        <Redirect exact from="/" to="/help" />
        */}
        <Route
          exact
          overlayWidth={overlayWidth}
          path="/" render={routeProps => (
          <Home
            {...routeProps}
            {...props}
            // prismicCtx={prismicCtx}
            // overlayWidth={overlayWidth}
          />
        )} />
        {/*
        <Route exact path="/posts" render={routeProps => (
          <Posts {...routeProps} prismicCtx={prismicCtx} />
        )} />
        */}

        {/* {
          prismicCtx && stream &&
          <Route exact path="/stream" render={routeProps => (
            <Stream
              {...routeProps}
              prismicCtx={prismicCtx}
              stream={stream}
              overlayWidth={overlayWidth}
            />
          )} />
        } */}

        {/*
        <Route exact path="/posts/:uid" render={routeProps => (
          <PostView {...routeProps} prismicCtx={prismicCtx} />
        )} />
        */}

        {/* <Route exact path='/about' render={(routeProps) => (
          <Page {...routeProps} title="About: This is a static test page passed from the router route prop" />
        )} /> */}

        {/*
        <Route exact path="/preview" render={routeProps => (
          <Preview {...routeProps} />
        )} />
        */}
        <Route component={NotFound} />
      </Switch>
    );
  // } // C
};

Router.propTypes = PROP_TYPES;
Router.defaultProps = DEFAULT_PROPS;

export default Router;
