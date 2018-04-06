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

// import './Stream.css';

const Figure = styled.figure`
  position: relative;
  background-color: ${cssVars.color.bgInvert};
  color: black;
  margin: 0;
  // max-width: #{$imageWidth}px;

  &.is-loading {
      background-color: #FFF;
      width: 100%;

      &::before {
        content: "";
        background-color: #999;
        object-fit: fill;
        // padding-bottom: calc(#{$imageHeight} / #{$imageWidth} * 100%);
        display: block;
      }

      &::after {
        content: "Loading...";
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #000;
        padding: 4px 8px;
        background-color: rgba(255, 255, 255, 0.5);
        border: 4px solid rgba(255, 255, 255, 0.5);
        border-radius: 4px;
      }
    }

    img {
      opacity: 0;
    }
  }

  img {
    display: block;
    max-width: 100%;
    opacity: 1;
    transition: opacity 600ms ease;
  }
`;

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
            url="/"
            key={key}
            iterator={key}
          />
//          <div key={key}>
//            <Lazyloader
//              root="#wrapper"
//              rootMargin="0% 0% 25%"
//              height={post.images.standard_resolution.height}
//              width={post.images.standard_resolution.width}
//              title={post.caption.text}
//              container={(<Figure className="post__img" />)}
//              applyRatio={true}
//              visibleClassName="is-visible"
//              loadingClassName="is-loading"
//              onVisible={() => console.log(`onVisible() => "${post.caption.text}" is VISIBLE!`)}
//            >
//              <img
//                src={post.images.standard_resolution.url}
//                height={post.images.standard_resolution.height}
//                width={post.images.standard_resolution.width}
//                alt=""
//              />
//            </Lazyloader>
//            <h4>{post.caption.text}</h4>
//          </div>
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
        <Stream>
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
