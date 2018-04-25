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
  font-size: ${cssVars.font.h1.size.sm};
  line-height: ${cssVars.font.h1.lineHeight}
  margin: calc(${cssVars.font.h1.marginY / 2} - ${addPx(styleVars.wrapper.sm.padding, styleVars.header.sm.padding)}) 0 ${cssVars.font.h1.marginY / 2};

  @media (min-width: ${cssVars.breakpoint.sm}) {
    font-size: ${cssVars.font.h1.size.lg};
    text-align: right;
    max-width: ${props => props.overlayWidth * 100}%;
    padding-right: ${multiplyPx(cssVars.spacing.base, 2)};
    margin: calc(${cssVars.font.h1.marginY} - ${addPx(styleVars.wrapper.lg.padding, styleVars.header.lg.padding)}) 0 ${cssVars.font.h1.marginY};
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
      <TitleEl {...props}>Behold &mdash; my ramblings <br />and photos. Enjoy.</TitleEl>
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
