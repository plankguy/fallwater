import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect, // eslint-disable-line
  withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';

import Preview from './Preview';
import Help from './Help';
import Post from './Post';
import Posts from './containers/Posts/Posts';
import NotFound from './NotFound';
import It from './containers/It';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

import './App.css';

// const App = withRouter(({ location }) => {
const App = (props) => {
  const { prismicCtx, match, location, history } = props;
  console.log('App.js props:', props);

  return (
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

            <Switch location={location}>
                {/*<Redirect exact from="/" to="/help" />*/}
                <Route exact path="/" component={It} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/posts" render={routeProps => (
                  <Posts {...routeProps} prismicCtx={prismicCtx} />
                )} />
                <Route exact path="/posts/:uid" render={routeProps => (
                  <Post {...routeProps} prismicCtx={prismicCtx} />
                )} />
                <Route exact path='/it' render={(routeProps) => (
                  <It {...routeProps} title="This is a static test page passed from the router route prop" prismicCtx={props.prismicCtx} />
                )} />
                <Route exact path="/preview" render={routeProps => (
                  <Preview {...routeProps} prismicCtx={prismicCtx} />
                )} />
                <Route component={NotFound} />
            </Switch>

          {/* </CSSTransitionGroup>
        </TransitionGroup> */}

      </section>

      <Footer />
    </main>
  )
};
// });

// export default App;
export default withRouter(App);
