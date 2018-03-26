import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatFontFamilyMap, addPx } from '../../styles/utils.js';
import cssVars from '../../styles/variables.json';

const PROP_TYPES = {};
const DEFAULT_PROPS = {};

const styleVars = {
  ...cssVars,
  wrapper: {
    borderWidth: '10px',
    borderColor: cssVars.colors.border,
  }
};

const WrapperEl = styled.main`
  position: fixed;
  top: ${styleVars.spacing.base};
  right: ${styleVars.spacing.base};
  bottom: ${styleVars.spacing.base};
  left: ${styleVars.spacing.base};
  padding: ${styleVars.spacing.base};
  overflow: auto;
  border: ${styleVars.wrapper.borderWidth} solid ${styleVars.wrapper.borderColor};
  font-family: ${formatFontFamilyMap(styleVars.fonts.family)};

  &::after {
    content: '';
    background: transparent url(https://st2.depositphotos.com/5834268/9859/v/950/depositphotos_98597414-stock-illustration-topographic-map-on-black-background.jpg) 50% 50% repeat;
    opacity: 0.3;
    position: fixed;
    top: ${addPx(styleVars.spacing.base, styleVars.wrapper.borderWidth)};
    right: ${addPx(styleVars.spacing.base, styleVars.wrapper.borderWidth)};
    bottom: ${addPx(styleVars.spacing.base, styleVars.wrapper.borderWidth)};
    left: ${addPx(styleVars.spacing.base, styleVars.wrapper.borderWidth)};
    z-index: -1;
  }
`;

const Wrapper = (props) => {
  return (
    <WrapperEl>
      {props.children}
    </WrapperEl>
  )
};

Wrapper.propTypes = PROP_TYPES;
Wrapper.defaultProps = DEFAULT_PROPS;

export default Wrapper;
