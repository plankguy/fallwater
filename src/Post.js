import React from 'react';
import PrismicReact from 'prismic-reactjs'; // eslint-disable-line

import Loading from './components/Loading/Loading';
import NotFound from './NotFound';

// Declare your component
export default class Page extends React.Component {

  state = {
    doc: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchPage(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  fetchPage(props) {
    if (props.prismicCtx) {
      console.log(props.prismicCtx);
      // We are using the function to get a document by its uid
      return props.prismicCtx.api.getByUID('blog', props.match.params.uid, {}, (err, doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ doc });
          // console.log('prismic props:', props);
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc });
          // console.warn('prismic error:', err);
        }
      });
    }

    return null;
  }

  render() {
    if (this.state.doc) {
      return (
        <div data-wio-id={this.state.doc.id}>

          {/* This is how to get text into your template*/}
          <h1>{PrismicReact.RichText.asText(this.state.doc.data.title)}</h1>

          {/* This is how to get an image into your template
          <img alt="cover" src={this.state.doc.data.<your-image-field-id>.url} />*/}

          {/* This is how to get structured text into your template */}
          {PrismicReact.RichText.render(this.state.doc.data.body, this.props.prismicCtx.linkResolver)}
        </div>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    } else {
      return <Loading />;
    }
  }
}
