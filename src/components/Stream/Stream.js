import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { multiplyPx, addPx, subtractPx } from '../../styles/utils.js';
import cssVars from '../../styles/variables/index.js';

const PROP_TYPES = {};
const DEFAULT_PROPS = {};

const styleVars = {
  ...cssVars,
  stream: {}
};

/**
 * Styled-Components CSS
 */
const TitleEl = styled.h1`
  font-weight: ${cssVars.font.h1.weight};
  font-style: italic;
  font-size: ${cssVars.font.h1.size};
  line-height: ${cssVars.font.h1.lineHeight}
  margin: calc(${cssVars.font.h1.marginY} - ${addPx(styleVars.wrapper.padding, styleVars.header.padding)}) 0 ${cssVars.font.h1.marginY} 0;

  @media (min-width: ${cssVars.breakpoint.sm}) {
    text-align: right;
    max-width: ${props => props.overlayWidth * 100}%;
    padding-right: ${multiplyPx(cssVars.spacing.base, 2)};
  }
`;

const StreamEl = styled.section`

`;

const PostsEl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const PostItem = styled.li`

`;

const Stream = (props) => {

  return (
    <StreamEl className="stream">
      <TitleEl {...props}>Behold &mdash; my ramblings and photos. Enjoy.</TitleEl>
      <PostsEl className="posts">
        {props.children.map((child, i) => (
          <PostItem key={i} className="posts__post">
            {child}
          </PostItem>
        ))}
      </PostsEl>
    </StreamEl>
  )
};

Stream.propTypes = PROP_TYPES;
Stream.defaultProps = DEFAULT_PROPS;

export default Stream;
