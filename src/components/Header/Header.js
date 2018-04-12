import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { addPx } from '../../styles/utils.js';
import cssVars from '../../styles/variables/index.js';

// import './Header.css';

const PROP_TYPES = {};

const DEFAULT_PROPS = {};

const styleVars = {
  ...cssVars,
};

/**
 * Styled-Components CSS
 */
const HeaderEl = styled.header`
  // background: rgba(255, 255, 100, 0.5);
  position: fixed;
  top: ${addPx(styleVars.wrapper.borderWidth, styleVars.spacing.base)};
  left: ${addPx(styleVars.wrapper.borderWidth, styleVars.spacing.base)};
  right: ${addPx(styleVars.wrapper.borderWidth, styleVars.spacing.base)};
  padding: ${styleVars.header.padding};
  z-index: 90;
`;

const Header = (props) => {
  const { children } = props;
  const baseClass = 'Header';

  return (
    <HeaderEl className={baseClass}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          ...child.props,
          parentClassName: baseClass,
        })
      )}
    </HeaderEl>
  )
};

Header.propTypes = PROP_TYPES;
Header.defaultProps = DEFAULT_PROPS;

export default Header;
