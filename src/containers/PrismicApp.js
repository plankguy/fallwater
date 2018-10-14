import 'whatwg-fetch';
import React from 'react';

import { fetchPrismicContext } from '../libs/Prismic';
import App from './App/App';

/**
 * Wrap base App component to provide prismic context
 * @TODO: move to Redux
 */
class PrismicApp extends React.Component {

  state = {
    prismicCtx: null,
  }

  async componentWillMount() {
  // async componentDidMount() {

    try {
      // console.log('fetch prismic context...', this.state); // eslint-disable-line no-console
      const prismicCtx = await fetchPrismicContext();
      await this.setState({ prismicCtx });
    } catch(err) {
       console.error(`Cannot contact the Prismic API, check your Prismic configuration:\n${err}`);
    }
  }
  // componentWillMount() {
  //   fetchPrismicContext()
  //     .then((prismicCtx) => {
  //       this.setState({ prismicCtx });
  //     }).catch((e) => {
  //       console.error(`Cannot contact the Prismic API, check your Prismic configuration:\n${e}`);
  //     });
  // }

  render() {
    return (
      <App prismicCtx={this.state.prismicCtx} />
    );
  }
}

export default PrismicApp;
