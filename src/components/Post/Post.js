import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import styled, { css } from 'styled-components';

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
};

const DEFAULT_PROPS = {
  teaser: '',
  readMoreLabel: 'Read More',
};

/**
 * Styled-Components CSS
 */
const Article = styled.article`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 8vmax;

  @media (min-width: ${cssVars.breakpoint.sm}) {
    flex-wrap: nowrap;

    &.is-even {
      flex-direction: row-reverse;
    }
  }
`;

const Figure = styled.figure`
  position: relative;
  background-color: ${cssVars.color.bgInvert};
  color: black;
  margin: 0 0 1.0em;
  width: 100%;
  max-width: ${image => image.dimensions.width}px;
  z-index: 1;

  @media (min-width: ${cssVars.breakpoint.sm}) {
    flex-basis: 50%;
    left: 5%;
    margin: 0;

    ${Article}.is-even & {
      left: -5%;
    }
  }

  /* Spacer - fills image content while loading */
  &::before {
    content: "";
    background-color: #999;
    object-fit: fill;
    width: 100%;
    padding-bottom: ${image => (image.dimensions.height / image.dimensions.width) * 100}%;/*calc(${image => image.dimensions.height} / ${image => image.dimensions.width} * 100%);*/
    display: block;
    z-index: 2;
    opacity: 0;
    transition: opacity 600ms ease;
  }

  &.is-loading {
      background-color: #FFF;
      width: 100%;

      &::before {
        opacity: 1;
        position: relative;
      }

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

    img {}
  }
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 100%;
  z-index: 2;
`;

const Content = styled.div`
  flex: 1 1 100%;
  z-index: 1;
  text-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
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

const Title = styled.h3`
  font-weight: 700;
  font-size: 3.5vmax;
  margin: 0;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: relative;
    border-bottom: 5px solid #FFF;
    margin: 0.25em 0;
    width: 100%;
  }

  @media (min-width: ${cssVars.breakpoint.sm}) {
    font-size: 5.5vmax;

    &::after {
      width: 20%;

      ${Article}.is-even & {
        left: 80%;
      }
    }
  }
`;

const Post = ({
  title,
  url,
  teaser,
  date,
  dateTime,
  type,
  readMoreLabel,
  image,
  iterator
}) => {

  const Date = styled.time``;

  return (
    <Article className={`post ${iterator % 2 ? 'is-even' : 'is-odd'}`}>
      {image &&
        <Lazyloader
          root="#wrapper"
          height={image.dimensions.height}
          width={image.dimensions.width}
          title={title}
          container={(() => (<Figure {...image} className="post__image" />))()}
          applyRatio={false}
          visibleClassName="is-visible"
          loadingClassName="is-loading"
          onVisible={() => console.log(`onVisible() => "${title}" is VISIBLE!`)}
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
        <Title className="post__title">
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
