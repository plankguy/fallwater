import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";

// Config
import GlobalConfig from '../../config/global';

// "Components"
import Router from '../../containers/Router';
import Wrapper from '../../components/Wrapper/Wrapper';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';

// CSS
import * as theme from '../../styles/variables/index.js';

class StaticApp extends React.Component {
  constructor(props) {
    super(props);

    // You can set initial state here:
    this.state = {
      loading: true,
    };
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Called after render only on client. Can access refs. The componentDidMount() method of child components is invoked before that of parent components. This is the place to call external libraries, use setTimeout, make ajax requests
   */
  async componentDidMount() {
    this.mounted = true;

    this.setState({ loading: false });
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
    const { location } = this.props; // eslint-disable-line no-unused-vars
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

          {/* PWA */}
          <link rel="manifest" href="/manifest.json" />
          {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color={theme.color.bg} />
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta name="theme-color" content={theme.color.bg} />

          {process.env.REACT_APP_ENV === 'production' &&
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-12445446-5"></script>
          }
          {process.env.REACT_APP_ENV === 'production' &&
            <script>
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-12445446-5');
              `}
            </script>
          }
        </Helmet>

        {/* Header & Nav */}
        <Header />

        {/* Page Content */}
        <Content className="Content">
          <Router
            location={location}
            overlayWidth={overlayWidth}
          />
        </Content>

        {/* Footer */}
        <Footer />

      </Wrapper>
    )
  }
};

export default withRouter(StaticApp);
