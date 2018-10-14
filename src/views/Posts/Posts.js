import React from 'react';
// import Prismic from 'prismic-javascript';
import PrismicReact from 'prismic-reactjs';

import { fetchAllPosts } from '../../models/PostsModel';
import { fetchPrismicPosts } from '../../libs/Prismic';
import { fetchInstagramPosts } from '../../libs/Instagram';

import Loading from '../../components/Loading/Loading';
import Post from '../../components/Post/Post';
import NotFound from '../404';

import './Posts.css';

// Declare your component
export default class Posts extends React.Component {

  constructor(props) {
    super(props);

    this.mounted = false;
  }

  state = {
    posts: {
      results: null,
      results_size: null,
    },
    loading: true,
    notFound: false,
  }

  componentWillMount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;

    // if (this.mounted) {
      this.getPosts();
    // }
  }

  // componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {
    this.mounted = false;
  }

  // componentDidUpdate() {}

  /**
  * Get posts via async fetch
  *
  * @param {object} Prismic context
  * @return {void}
  */
  getPosts(prismicCtx) {
    fetchPrismicPosts(prismicCtx).then((posts) => { // prismicCtx
      if (posts) {
        this.setState({
          ...this.state,
          loading: false,
          posts,
        });
      } else {
        this.setState({
          loading: true,
        });
      }
    });
  }

  render() {
    this.mounted = true;
debugger; // isline-disable-line
    // Check for results
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
                <Post
                  title={PrismicReact.RichText.asText(title)}
                  url={`/posts/${post.uid}`}
                  teaser={PrismicReact.RichText.asText(teaser)}
                  date={formattedDate}
                  dateTime={post.last_publication_date}
                  image={image.sm}
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
