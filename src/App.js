import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect, // eslint-disable-line
  // withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';


import Preview from './Preview';
import Help from './Help';
import Post from './Post';
import Posts from './Posts';
import NotFound from './NotFound';
import It from './containers/It';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

import './App.css';

const App = (props) => (
// const App = withRouter(({ location, props }) => (
  <main className="wrapper">
    <header className="Header">
      <Nav />
    </header>

    <section className="Content">

      {/* <TransitionGroup>
        <CSSTransitionGroup
          key={location.key}
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        > */}
        {/* <Router> */}
          {/* <Switch location={location}> */}
          <Switch>
              {/*<Redirect exact from="/" to="/help" />*/}
              {/* <IndexRoute exact path="/" component={It} /> */}
              <Route exact path="/help" component={Help} />
              <Route exact path="/posts" render={routeProps => (
                <Posts {...routeProps} prismicCtx={props.prismicCtx} />
              )} />
              <Route exact path="/posts/:uid" render={routeProps => (
                <Post {...routeProps} prismicCtx={props.prismicCtx} />
              )} />
              <Route exact path='/it' render={(routeProps) => (
                <It {...routeProps} title="This is a static test page passed from the router route prop" prismicCtx={props.prismicCtx} />
              )} />
              <Route exact path="/preview" render={routeProps => (
                <Preview {...routeProps} prismicCtx={props.prismicCtx} />
              )} />
              <Route component={NotFound} />
          </Switch>
        {/* </Router> */}
        {/* </CSSTransitionGroup> */}
      {/* </TransitionGroup> */}
    </section>

    <Footer />
  </main>
// ));
);

export default App;
