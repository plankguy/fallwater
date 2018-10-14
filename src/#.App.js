import React from 'react';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  Redirect, // eslint-disable-line
} from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';


import Preview from './Preview';
import Help from './Help';
import PostView from './PostView';
import Posts from './Posts';
import It from './containers/It';
import NotFound from './NotFound';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

import './App.css';

const App = (props) => (
  <main className="wrapper">
    <header>
      <Nav />
    </header>

    {/* <Router> */}
      <Switch>
        {/* <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        > */}
          {/*<Redirect exact from="/" to="/help" />*/}
          <Route exact path="/help" component={Help} />
          <Route exact path="/posts" render={routeProps => (
            <Posts {...routeProps} prismicCtx={props.prismicCtx} />
          )} />
          <Route exact path="/posts/:uid" render={routeProps => (
            <PostView {...routeProps} prismicCtx={props.prismicCtx} />
          )} />
          <Route exact path='/it' render={(routeProps) => (
            <It {...routeProps} title="This is a static test page passed from the router route prop" prismicCtx={props.prismicCtx} />
          )} />
          <Route exact path="/preview" render={routeProps => (
            <Preview {...routeProps} prismicCtx={props.prismicCtx} />
          )} />
          <Route component={NotFound} />
        {/* </CSSTransitionGroup> */}
      </Switch>
    {/* </Router> */}

    <Footer />
  </main>
);

export default App;
