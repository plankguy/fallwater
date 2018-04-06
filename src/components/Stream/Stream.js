import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { addPx } from '../../styles/utils.js';
import cssVars from '../../styles/variables/index.js';

const PROP_TYPES = {};
const DEFAULT_PROPS = {};

const styleVars = {
  ...cssVars,
  stream: {}
};

const Stream = (props) => {

  const Posts = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
  `;

  const PostItem = styled.li`

  `;

  return (
    <Posts className="posts">
      {props.children.map((child, i) => (
        <PostItem key={i} className="posts__post">
          {child}
        </PostItem>
      ))}
    </Posts>
  )
};

Stream.propTypes = PROP_TYPES;
Stream.defaultProps = DEFAULT_PROPS;

export default Stream;
