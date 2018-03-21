import React from 'react';
import PrismicReact from 'prismic-reactjs';

import { formatIsoDate } from '../../libs/UiHelpers';

import Loading from '../../components/Loading/Loading';
import Post from '../../components/Post/Post';
import NotFound from '../../NotFound';

import './Stream.css';

// Declare your component
export default class Stream extends React.Component {

  state = {
    stream: {
      meta: null,
      posts: [],
    },
    loading: true,
    notFound: false,
  }

  /**
   * Set posts state for the streamData
   *
   * @param {object}
   * @return {void}
   */
  // async setPosts(prismicCtx) {
  //   try {
  //     const streamData = await fetchAllPosts(prismicCtx);
  //
  //     if (streamData.posts) {
  //       this.setState({
  //         ...this.state,
  //         loading: false,
  //         stream: streamData,
  //       });
  //     } else {
  //       this.setState({
  //         loading: true,
  //       });
  //     }
  //   } catch(err) {
  //     console.error(`Could not get posts stream:\n${err}`); // eslint-disable-line no-console
  //   }
  // }

  // componentWillUnmount() {
  //   this.mounted = false;
  // }
  //
  // async componentDidMount() {
  // // async componentWillMount() {
  //   this.mounted = true;
  //
  //   if (this.props.prismicCtx !== null && this.mounted) {
  //     this.setPosts(this.props.prismicCtx);
  //   }
  // }
  //
  // // componentDidMount() {}
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.prismicCtx !== null) {
  //     this.setPosts(nextProps.prismicCtx);
  //   }
  // }

  // componentDidUpdate() {}

  /**
   * Change post component based on type (Prismic blog, Instagram)
   */
  switchPostMarkup(post) {
    let componentMarkup;

    switch (post.medium) {
      case 'instagram':
        componentMarkup = (
          <div>
            <img src={post.images.standard_resolution.url} alt="" />
            <h4>{post.caption.text}</h4>
          </div>
        );
        break;

      default:
        const { title, teaser, image } = post.data;
        componentMarkup = (
          <Post
            title={PrismicReact.RichText.asText(title)}
            url={`/posts/${post.uid}`}
            teaser={PrismicReact.RichText.asText(teaser)}
            date={formatIsoDate(post.created_date)}
            dateTime={post.created_date}
            image={image.sm}
          />
        );
    }

    return componentMarkup;
  }

  /**
   *
   */
  render() {
    // Check for stream
    if (this.props.stream) {

      // const { posts } = this.state.stream;
      const { posts } = this.props.stream;

      return (
        <ul className="Posts">

          {posts.map((post, i) => {
            return (
              <li
                key={i}
                className="Posts__item"
              >
                {this.switchPostMarkup(post)}
              </li>
            )
          })}

        </ul>
      );

    // } else if (this.state.notFound) {
    } else if (this.props.notFound) {
      return <NotFound />;
    } else {
      return <Loading />;
    }
  }
}
