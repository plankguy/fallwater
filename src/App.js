import React from 'react';
import {
  // BrowserRouter as Router, // eslint-disable-line no-unused-vars
  Route,
  Switch,
  // Redirect, // eslint-disable-line no-unused-vars
  withRouter,
} from 'react-router-dom';
import {
  TransitionGroup,    // eslint-disable-line no-unused-vars
  CSSTransition, // eslint-disable-line no-unused-vars
} from 'react-transition-group';

// "Pages"
import Preview from './Preview';
import Post from './Post';
import Posts from './containers/Posts/Posts';
import NotFound from './NotFound';
import It from './containers/It';
// "Components"
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Hamburger from './components/Hamburger/Hamburger';
import Footer from './components/Footer/Footer';

import './App.css';

// const App = withRouter(({ location }) => {
const App = (props) => {
  const { prismicCtx, match, location, history } = props; // eslint-disable-line no-unused-vars
  // console.log('App.js props:', props, 'location:', location);

  return (
    <main className="wrapper">
      <Header
        Nav={Nav}
        Hamburger={Hamburger}
      />

      <section className="Content">

        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames={{
              appear: 'is-appear',
              appearActive: 'is-active-appear',
              enter: 'is-enter',
              enterActive: 'is-active-enter',
              exit: 'is-exit',
              exitActive: 'is-active-exit',
            }}
            timeout={{
              enter: 200,
              exit: 200,
            }}
          >
            <div className="Content__transition">

              <Switch location={location}>
                  {/*<Redirect exact from="/" to="/help" />*/}
                  <Route exact path="/" component={It} />
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

            </div>

          </CSSTransition>
        </TransitionGroup>

      </section>

      <Footer />
    </main>
  )
};
// });

// export default App;
export default withRouter(App);
