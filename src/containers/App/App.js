import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import {
  TransitionGroup, // eslint-disable-line no-unused-vars
  CSSTransition,   // eslint-disable-line no-unused-vars
} from 'react-transition-group';
import { Link } from 'react-router-dom';

// "Pages"
import Preview from '../../Preview';
import Post from '../../Post';
import Posts from '../../containers/Posts/Posts';
import NotFound from '../../NotFound';
import It from '../../containers/It';
// "Components"
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Hamburger from '../../components/Hamburger/Hamburger';
import Logo from '../../components/Logo/Logo';
import Menu from '../../components/OffCanvasMenu/OffCanvasMenu';
import MenuTransition from '../../containers/MenuTransition/MenuTransition';
import Footer from '../../components/Footer/Footer';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    // You can set initial state here:
    this.state = {
      counter: 0,
      menuOpen: false,
    };

    // Some rando properties :)
    this.siteName = 'Jeff Waterfall';

    // ES6 - you need to bind handers to `this`
    this.handleCounter = this.handleCounter.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  /*
   * Triggered before initial render()
   * Invoked once, both on the client and server. If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.
   */
  // componentWillMount() {}

  /*
   * Called after render only on client. Can access refs. The componentDidMount() method of child components is invoked before that of parent components. This is the place to call external libraries, use setTimeout, make ajax requests
   */
  // componentDidMount() {}

  /*
   * Called when there are new props or state changes. Return false to prevent a render. Good for performance. NOT called for the initial render or when forceUpdate is used.
   * (Update only)
  */
  // shouldComponentUpdate(nextProps, nextState) {}

  /*
   * Invoked immediately before rendering or when new props or state are being received. Not called for the initial render.
   * Cannot use setState in this method. Use componentWillReceiveProps instead. Use this as an opportunity to perform preparation before an update occurs.
   * (Update only)
   */
  // componentWillUpdate(nextProps, nextState) {}

  /*
   * Called before render when props change. Access to old props. It is NOT triggered on initial mount/render.
   *(Update only)
   */
  // componentWillReceiveProps(nextProps) {}

  /*
   * Access to prevState, prevProps. Use this as an opportunity to operate on the DOM (refs) when the component has been updated. It is NOT triggered on initial mount/render.
   * (Update only)
   */
  // componentDidUpdate(prevProps, prevState) {}

  /*
   * Invoked immediately before a component is unmounted from the DOM. Clean up event bindings, etc.
   */
  // componentWillUnmount() {}

  // Custom click handler method
  handleCounter(e, operation) {
    this.setState((prevState, props) => {
      return {
        counter: operation === 'increase' ? prevState.counter + 1 : prevState.counter - 1,
      };
    });
  }

  //
  handleMenuToggle(e) {
    this.setState((prevState, props) => {
      return {
        menuOpen: !prevState.menuOpen,
      };
    });
  }

  // Render jsx. Triggered when the state changes.
  render() {
    const { prismicCtx, match, location, history } = this.props; // eslint-disable-line no-unused-vars
    // console.log('App.js props:', props, 'location:', location);

    return (
      <main className="wrapper">

        {/* "Drawer" Menu: */}
        <CSSTransition
          in={!this.state.menuOpen}
          classNames={'is-menuopen-'}
          timeout={{
            enter: 200,
          }}
        >
          <Menu
            isOpen={this.state.menuOpen}
            parentClassName="App"
          />
        </CSSTransition>

        <MenuTransition menuOpen={!this.state.menuOpen}>

          <div className="wrapper__transition">

            {/* Header & Nav */}
            <Header>
              <Logo>
                <Link to="/">
                  {this.siteName}
                </Link>
              </Logo>
              <Nav />
              <Hamburger
                clickHandler={this.handleMenuToggle}
                isOpen={this.state.menuOpen}
              />
            </Header>

            {/* Page Content */}
            <section className="Content">

              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames={/*'is-fade'*/
                  {
                    appear: 'is-fade-appear',
                    appearActive: 'is-fade-active-appear',
                    enter: 'is-fade-enter',
                    enterActive: 'is-fade-active-enter',
                    exit: 'is-fade-exit',
                    exitActive: 'is-fade-active-exit',
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
                        <Route exact path='/about' render={(routeProps) => (
                          <It {...routeProps} title="About: This is a static test page passed from the router route prop" prismicCtx={prismicCtx} />
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

            {/* Footer */}
            <Footer />

            <div className="test" style={{width: 300, padding: 20, border: '1px solid #CCC', margin: '0 auto'}}>
              <h4>State Counter</h4>
              <button className="Button" onClick={(e) => this.handleCounter(e, 'increase')}>
                +
              </button>
              &nbsp;
              <button className="Button" onClick={(e) => this.handleCounter(e, 'decrease')}>
                &ndash;
              </button>
              <pre>{this.state.counter}</pre>
            </div>

          </div>
        </MenuTransition>
      </main>
    )
  }
};

export default withRouter(App);
