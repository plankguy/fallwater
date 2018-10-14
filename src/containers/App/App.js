import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
// import {
//   TransitionGroup, // eslint-disable-line no-unused-vars
//   CSSTransition,   // eslint-disable-line no-unused-vars
// } from 'react-transition-group';

// Config
import GlobalConfig from '../../config/global';
// import routesConfig from '../../config/routes'; // TEMP disable

// Models
import { fetchAllPosts } from '../../models/PostsModel';

// "Components"
import Router from '../../containers/Router';
import Wrapper from '../../components/Wrapper/Wrapper';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import Nav from '../../components/Nav';
import Hamburger from '../../components/Hamburger/Hamburger';
import Logo from '../../components/Logo/Logo';
import Menu from '../../components/OffCanvasMenu/OffCanvasMenu';
// // import MenuTransition from '../../containers/MenuTransition/MenuTransition';
import Footer from '../../components/Footer/Footer';

// CSS
import cssVars from '../../styles/variables/index.js';
import './App.css';

const PROP_TYPES = {
  prismicCtx: PropTypes.object,
};

const DEFAULT_PROPS = {
  prismicCtx: null,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    // You can set initial state here:
    this.state = {
      counter: 0,
      isMenuOpen: false,
      stream: null,
      loading: true,
      postsFetched: false,
    };

    // ES6 - you need to bind handers to `this`
    this.handleCounter = this.handleCounter.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  /**
   * Set posts state for the streamData
   *
   * @param {object}
   * @return {void}
   */
  async setStream(prismicCtx) {
    try {
      const streamData = await fetchAllPosts(prismicCtx);

      if (streamData.posts) {
        this.setState({
          ...this.state,
          loading: false,
          postsFetched: true,
          stream: streamData,
        });
      } else {
        this.setState({
          loading: true,
        });
      }
    } catch(err) {
      console.error(`Could not get posts stream:\n${err}`); // eslint-disable-line no-console
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * UNSAFE (16.3): Triggered before initial render()
   * Invoked once, both on the client and server. If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.
   */
  // UNSAFE_componentWillMount() {}

  // static getDerivedStateFromProps(props, state) {}
  componentDidUpdate(nextProps) {
    if (nextProps.prismicCtx !== null && !this.state.postsFetched) {
      this.setStream(nextProps.prismicCtx);
    }
  }

  /**
   * Called after render only on client. Can access refs. The componentDidMount() method of child components is invoked before that of parent components. This is the place to call external libraries, use setTimeout, make ajax requests
   */
  async componentDidMount() {
    this.mounted = true;

    this.setState({ loading: false });

    // @NOTE: never gets called as prismic context gets passed as prop, not promise
    // if (this.props.prismicCtx !== null && this.mounted) {
    //   this.setStream(this.props.prismicCtx);
    // }

    // Polyfill IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      const body = document.getElementsByTagName('body')[0];
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver';
      body.appendChild(script);
    }
  }

  /**
   * Called when there are new props or state changes. Return false to prevent a render. Good for performance. NOT called for the initial render or when forceUpdate is used.
   * (Update only)
  */
  // shouldComponentUpdate(nextProps, nextState) {}

  /**
   * UNSAFE (16.3): Invoked immediately before rendering or when new props or state are being received. Not called for the initial render.
   * Cannot use setState in this method. Use componentWillReceiveProps instead. Use this as an opportunity to perform preparation before an update occurs.
   * (Update only)
   */
  // componentWillUpdate(nextProps, nextState) {}

  /**
   * DEPRECATED (16.3): Called before render when props change. Access to old props. It is NOT triggered on initial mount/render.
   * (Update only)
   */
  // componentWillReceiveProps(nextProps) {}

  /* Replaced with NEW (16.3): */
  // getDerivedStateFromProps() {}

  /**
   * Access to prevState, prevProps. Use this as an opportunity to operate on the DOM (refs) when the component has been updated. It is NOT triggered on initial mount/render.
   * (Update only)
   */
  // componentDidUpdate(prevProps, prevState) {}

  /**
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
        isMenuOpen: !prevState.isMenuOpen,
      };
    });
  }

  /**
   * Returns overlay width for each route
   */
  overlayWidth() {

    const slug = this.props.location.pathname.split('/')[1] || '';
    let width;

    switch (slug) {
      case '':
        width = 0.395;
        break;

      case 'stream':
        width = 0.5;
        break;

      default:
        width = 0.5;
        break;
    }

    return width;
  }

  // Render jsx. Triggered when the state changes.
  render() {
    const {
      prismicCtx,
      match,
      location,
      history,
    } = this.props; // eslint-disable-line no-unused-vars
    const {
      stream,
    } = this.state;
    const overlayWidth = this.overlayWidth();

    return (
      <Wrapper id="wrapper" overlayWidth={overlayWidth}>

        {/* {this.state.isLoading ? 'loading...' : 'Loaded!' } */}

        <Helmet>
          {/* Standard Metadata */}
          <title>{GlobalConfig.siteTitle}</title>
          <meta name="description" content={GlobalConfig.siteDesc} />
          <meta name="author" content={GlobalConfig.siteAuthor} />
          <meta name="robots" content={GlobalConfig.seoRobots} />
          <meta name="theme-color" content={cssVars.color.bg} />

          {/* Twitter Meta */}
          <meta name="twitter:site" content={GlobalConfig.twitterHandle} />
          <meta name="twitter:title" content={GlobalConfig.siteTitle} />
          <meta name="twitter:description" content={GlobalConfig.siteDesc} />
          <meta name="twitter:url" content={GlobalConfig.siteUrl} />
            {/* <meta name="twitter:card" content="summary_large_image" /> */}
            {/* <meta property="twitter:image" content={seoImage} /> */}

          {/* Opengraph (Facebook) Meta */}
          <meta property="og:site_name" content={GlobalConfig.siteName} />
          <meta property="og:title" content={GlobalConfig.siteTitle} />
          <meta property="og:url" content={GlobalConfig.siteUrl} />
          <meta property="og:description" content={GlobalConfig.siteDesc} />
            {/* <meta property="og:image" content={seoImage} /> */}
          <meta property="og:locale" content="en" />

          {/* Schema.org Meta */}
          <meta itemprop="name" content={GlobalConfig.siteTitle} />
          <meta itemprop="description" content={GlobalConfig.siteDesc} />
          <meta itemprop="url" content={GlobalConfig.siteUrl} />
          <meta itemprop="author" content={GlobalConfig.siteAuthor} />
            {/* <meta itemprop="logo" content="https://hootsuite.com/dist/images/logos/hootsuite/logo@2x.png"/> */}
          <meta itemprop="sameAs" content={GlobalConfig.twitterUrl} />
          <meta itemprop="sameAs" content={GlobalConfig.instagramUrl} />
        </Helmet>

        {/* Header & Nav */}
        <Header>
          <Nav
            overlayWidth={overlayWidth}
            items={[
              {
                label: 'Home',
                url: '/',
                exact: true,
              },
              {
                label: 'Stream',
                url: '/stream',
              },
              {
                label: 'About',
                url: '/about',
              },
            ]}
          >
            <Logo>
              <Link to="/">
                {GlobalConfig.siteName}
              </Link>
            </Logo>
          </Nav>
          <Hamburger
            clickHandler={this.handleMenuToggle}
            isOpen={this.state.isMenuOpen}
          />
          {/* "Drawer" Menu: */}
          <Menu
            isOpen={this.state.isMenuOpen}
            parentClassName="App"
          />
        </Header>

        {/* Page Content */}
        <Content className="content">
          <Router
            location={location}
            prismicCtx={prismicCtx}
            stream={stream}
            overlayWidth={overlayWidth}
          />
        </Content>

        {/* Footer */}
        <Footer>
          {/* Testing */}
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
        </Footer>

      </Wrapper>
    )
  }
};

App.propTypes = PROP_TYPES;
App.defaultProps = DEFAULT_PROPS;

export default withRouter(App);
