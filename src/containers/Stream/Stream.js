import React from 'react';
import PrismicReact from 'prismic-reactjs';
import LazyLoad from 'react-lazy-load';
import styled from 'styled-components';

import { formatIsoDate } from '../../libs/UiHelpers';
import cssVars from '../../styles/variables/index.js';

import Lazyloader from '../Lazyloader/Lazyloader';
import Loading from '../../components/Loading/Loading';
import Stream from '../../components/Stream/Stream';
import Post from '../../components/Post/Post';
import NotFound from '../../NotFound';

// Declare your component
export default class StreamLayout extends React.Component {

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
  // componentDidMount() {}
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
  switchPostMarkup(post, key) {
    let componentMarkup;
    switch (post.medium) {
      case 'instagram':

        componentMarkup = (
          <Post
            title={post.caption.text}
            image={{
              url: post.images.standard_resolution.url,
              dimensions: {
                width: post.images.standard_resolution.width,
                height: post.images.standard_resolution.height,
              },
              alt: `Photo of ${post.caption.text}`,
            }}
            date={formatIsoDate(post.created_date)}
            dateTime={post.created_date}
            type={`Photo`}
            key={key}
            iterator={key}
          />
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
            type={`Post`}
            image={image.md}
            key={key}
            iterator={key}
          />
        );
    }

    return componentMarkup;
  }

  /**
   *
   */
  render() {
    // Check for stream data
    if (this.props.stream) {

      const { posts } = this.props.stream;

      return (
        <Stream {...this.props}>
          {posts.map((post, i) => this.switchPostMarkup(post, i))}
        </Stream>
      );

    } else if (this.state.notFound) {
    // } else if (this.props.notFound) {
      return <NotFound />;
    } else {
      return <Loading />;
    }
  }
}
