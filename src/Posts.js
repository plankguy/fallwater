import React from 'react';
import Prismic from 'prismic-javascript';
import PrismicReact from 'prismic-reactjs'; // eslint-disable-line
import { Link } from 'react-router-dom';

import Loading from './components/Loading/Loading';
import NotFound from './NotFound';

// Declare your component
export default class Page extends React.Component {

  state = {
    posts: {
      results: null,
      results_size: null,
    },
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

  async fetchPage(props) {
    if (props.prismicCtx) {
      // console.log('prismicCtx', props.prismicCtx);

      // const single = await props.prismicCtx.api.getSingle('blog');
      // console.log(single);

      return await props.prismicCtx.api.query(
        Prismic.Predicates.at('document.type', 'blog'),
        {
          orderings: '[my.blog.date desc]',
          pageSize: 10,
        }, (err, posts) => {
          if (posts) {
            console.log(posts);
            this.setState({ posts });
          } else {
            console.warn('prismic error:', err);
          }
        },
      );

    //   return props.prismicCtx.api.getByUID('blog', props.match.params.uid, {}, (err, doc) => {
    //     if (doc) {
    //       // We put the retrieved content in the state as a doc variable
    //       this.setState({ doc });
    //       // console.log('prismic props:', props);
    //     } else {
    //       // We changed the state to display error not found if no matched doc
    //       this.setState({ notFound: !doc });
    //       // console.warn('prismic error:', err);
    //     }
    //   });
    }

    return null;
  }

  render() {

    if (this.state.posts.results) {
      console.log(this.state.posts.results);
      return (
        <div>

          {this.state.posts.results.map((post, i) => (
            <h3 key={i}>
              <Link to={`/posts/${post.uid}`}>
                {PrismicReact.RichText.asText(post.data.title)}
              </Link>
            </h3>
          ))}

        </div>
      );

    } else if (this.state.notFound) {
      return <NotFound />;
    } else {
      return <Loading />;
    }
  }
}
