import React from 'react';
import Prismic from 'prismic-javascript';
import PrismicReact from 'prismic-reactjs'; // eslint-disable-line

import Loading from '../../components/Loading/Loading';
import Post from '../../components/Post/Post';
import NotFound from '../../NotFound';

import './Posts.css';

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
      return await props.prismicCtx.api.query(
        Prismic.Predicates.at('document.type', 'blog'),
        {
          orderings: '[my.blog.date desc]',
          pageSize: 10,
        }, (err, posts) => {
          if (posts) {
            console.log('Posts.js posts:', posts);
            this.setState({ posts });
            // this.setState(posts);
          } else {
            console.warn('prismic error:', err);
          }
        },
      );
    }

    return null;
  }

  render() {

    if (this.state.posts.results) {
      const { results, results_size } = this.state.posts; // eslint-disable-line no-unused-vars

      return (
        <ul className="Posts">

          {results.map((post, i) => {
            const date = new Date(post.first_publication_date);
            const formattedDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}`;
            const { title, teaser, image } = post.data;

            return (
              <li
                key={i}
                className="Posts__item"
              >
                {image.sm.url &&
                  <img
                    src={image.sm.url}
                    alt={image.sm.alt}
                    width={image.sm.dimensions.width}
                    height={image.sm.dimensions.height}
                  />
                }
                <Post
                  title={PrismicReact.RichText.asText(title)}
                  url={`/posts/${post.uid}`}
                  teaser={PrismicReact.RichText.asText(teaser)}
                  date={formattedDate}
                  dateTime={post.last_publication_date}
                />
              </li>
            )
          })}

        </ul>
      );

    } else if (this.state.notFound) {
      return <NotFound />;
    } else {
      return <Loading />;
    }
  }
}
