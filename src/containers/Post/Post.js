import React from 'react';
import PrismicReact from 'prismic-reactjs'; // eslint-disable-line
import { Link } from 'react-router-dom';

import { fetchPrismicContext } from '../../libs/Prismic';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../NotFound';

// Declare your component
export default class Post extends React.Component {

  state = {
    Post: null,
    notFound: false,
  }

  // componentWillMount() {
  componentDidMount() {
    this.fetchPage(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
  }

  componentDidUpdate() {
    // this.props.prismicCtx.toolbar();
  }

  async fetchPage(props) {
    const prismicContext = await fetchPrismicContext()

    if (prismicContext) {
      // We are using the function to get a Postument by its uid
      return prismicContext.api.getByUID('blog', props.match.params.uid, {}, (err, Post) => {
        if (Post) {
          // We put the retrieved content in the state as a Post variable
          this.setState({ Post, prismicContext });
          // console.log('prismic props:', props);
        } else {
          // We changed the state to display error not found if no matched Post
          this.setState({ notFound: !Post });
          // console.warn('prismic error:', err);
        }
      });
    }
/*
    if (props.prismicCtx) {
      console.log('fetchPage prismicCtx', props.prismicCtx);
      // We are using the function to get a Postument by its uid
      return props.prismicCtx.api.getByUID('blog', props.match.params.uid, {}, (err, Post) => {
        if (Post) {
          // We put the retrieved content in the state as a Post variable
          this.setState({ Post });
          // console.log('prismic props:', props);
        } else {
          // We changed the state to display error not found if no matched Post
          this.setState({ notFound: !Post });
          // console.warn('prismic error:', err);
        }
      });
    }
*/

    return null;
  }

  render() {

    if (this.state.Post) {
      console.log('containers/Post/Post.js state', this.state.Post);

      return (
        <div data-wio-id={this.state.Post.id}>

          <Link to="/posts">
            &larr; Posts
          </Link>

          {/* This is how to get text into your template*/}
          <h1>{PrismicReact.RichText.asText(this.state.Post.data.title)}</h1>

          {/* This is how to get an image into your template */}
          <img alt="cover" src={this.state.Post.data.image.lg.url} />

          {/* This is how to get structured text into your template */}
          {PrismicReact.RichText.render(this.state.Post.data.body, this.state.prismicContext.linkResolver)}
        </div>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    } else {
      return <Loading />;
    }
  }
}
