import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import styled, { css, keyframes } from 'styled-components';

import Lazyloader from '../../containers/Lazyloader/Lazyloader';
import cssVars from '../../styles/variables/index.js';
import './Post.css';

const PROP_TYPES = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  teaser: PropTypes.string,
  date: PropTypes.string,
  dateTime: PropTypes.string,
  readMoreLabel: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    dimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }).isRequired,
  iterator: PropTypes.number,
  isVisible: PropTypes.bool,
  isLeaving: PropTypes.bool,
};

const DEFAULT_PROPS = {
  teaser: '',
  readMoreLabel: 'Read More',
  isVisible: true,
  isLeaving: true,
};

/**
 * Styled-Components CSS
 */
// Post container
const Article = styled.article`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 8vmax;

  /* transform: translate3d(0, 0, 0);
  transition: opacity 300ms ease-in, transform 200ms ease-out;

  &.is-outview {
    opacity: 0;

    &.is-even {
      transform: translate3d(-10%, 0, 0);
    }
    &.is-odd {
      transform: translate3d(10%, 0, 0);
    }
  } */

  @media (min-width: ${cssVars.breakpoint.sm}) {
    flex-wrap: nowrap;

    &.is-even {
      flex-direction: row-reverse;
    }
  }
`;
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Post image container
const Figure = styled.figure`
  position: relative;
  background-color: ${cssVars.color.bgInvert};
  color: black;
  margin: 0 0 1.0em;
  width: 100%;
  max-width: ${image => image.dimensions.width}px;
  z-index: 1;
  /* Anination */
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: opacity 300ms ease-in, transform 200ms ease-out;

  ${Article}.is-outview & {
      opacity: 0.5;
  }
  ${Article}.is-outview.is-even & {
    transform: translate3d(-10%, 10%, 0);
  }
  ${Article}.is-outview.is-odd & {
    transform: translate3d(10%, -10%, 0);
  }

  /* Desktop */
  @media (min-width: ${cssVars.breakpoint.sm}) {
    flex-basis: 50%;
    left: 5%;
    margin: 0;

    ${Article}.is-even & {
      left: -5%;
    }
  }

  /* Spacer - fills figure container while loading */
  &::before {
    content: "";
    background-color: ${cssVars.color.bg}; // #000;
    object-fit: fill;
    width: 100%;
    padding-bottom: ${image => `${(image.dimensions.height / image.dimensions.width) * 100}%`};
    display: block;
    z-index: 3;
    opacity: 1;
    transition: opacity 600ms ease;
  }

  /* Loaded! */
  &.is-loaded {

    &::before {
      opacity: 0;
    }
  }

  /* Loading icon */
  &:not(.is-loaded).is-visible {
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-style: solid;
      border-color: #DDD #DDD #DDD transparent;
      border-width: 5px;
      border-radius: 100%;
      width: 30px;
      height: 30px;
      z-index: 4;
      animation: ${rotate360} 600ms linear infinite;
    }
  }

  /* Currently loading... */
  &.is-loading {
      background-color: #FFF;
      width: 100%;

      /* Overlay */
      &::before {
        opacity: 1;
        position: relative;
      }

    img {}
  }
`;

// Image
const Img = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 100%;
  z-index: 2;
`;

// Post body
const Content = styled.div`
  flex: 1 1 100%;
  z-index: 1;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.6);
  word-break: break-word;

  @media (min-width: ${cssVars.breakpoint.sm}) {
    left: -5%;
    flex: 1 0 50%;

    ${Article}.is-even & {
      text-align: right;
      left: 5%;
    }
  }
`;

// Date & tags
const Meta = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.7em;
  font-weight: 400;
  margin: 0 0 0.5em;

  .post__meta__hyphen {
    vertical-align: sub;
    padding: 0 0.5em;
  }
  .post__meta__type {
    font-weight: 700;
  }
`;

// Title
const Title = styled.h3`
  font-weight: 600;
  font-size: 3.5vmax;
  margin: 0;
  position: relative;

  /* Bottom border */
  &::after {
    content: '';
    display: block;
    position: relative;
    border-bottom: 5px solid #FFF;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
    margin: 0.75em 0 0;
    width: 100%;
  }

  @media (min-width: ${cssVars.breakpoint.sm}) {
    font-size: ${(props) => props.title.length < 75 ? 5.5 : 4.5}vmax;

    &::after {
      width: 20%;

      ${Article}.is-even & {
        left: 80%;
      }
    }
  }
`;

const Date = styled.time ``;

const Post = ({
  title,
  url,
  teaser,
  date,
  dateTime,
  type,
  readMoreLabel,
  image,
  iterator,
  isVisible,
  isLeaving,
  isIntersecting
}) => {

  // Dynamic post container classes
  const postClassNames = [
    'post',
    iterator % 2 ? 'is-even' : 'is-odd',
    isIntersecting ? 'is-intersecting' : '',
    isVisible ? 'is-inview' : 'is-outview',
  ].join(' ').trim();

  return (
    <Article className={postClassNames}>
      {image &&
        <Lazyloader
          root="#wrapper"
          height={image.dimensions.height}
          width={image.dimensions.width}
          title={title}
          container={(() => (<Figure {...image} className="post__image" />))()}
          applyRatio={false}
          onlyOnce={true}
          visibleClassName="is-visible"
          loadingClassName="is-loading"
          loadedClassName="is-loaded"
          // onVisible={() => console.log(`onVisible() => "${title}" is VISIBLE!`)}
        >
          <Img
            src={image.url}
            alt={image.alt}
            className="post__image__img"
          />
        </Lazyloader>
      }

      {url &&
        <Link className="post__title__link" to={url}></Link>
      }

      <Content className="post__content">
        <Meta className="post__meta">
          <span className="post__meta__type">{type}</span>
          <span className="post__meta__hyphen">&mdash;</span>
          {date &&
            <Date dateTime={dateTime}>{date}</Date>
          }
        </Meta>
        <Title className="post__title" title={title}>
          {url ?
            <Link className="post__title__link" to={url}>
              {title}
            </Link>
            :
            title}
        </Title>
        {teaser &&
          <p className="Post__teaser">{teaser}</p>
        }
        {url &&
          <Link className="Post__link" to={url}>
            {readMoreLabel} &rarr;
          </Link>
        }
      </Content>
    </Article>
  );
};

Post.propTypes = PROP_TYPES;
Post.defaultProps = DEFAULT_PROPS;

export default Post;
