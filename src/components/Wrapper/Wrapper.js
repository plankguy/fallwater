import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { formatFontFamilyMap, addPx } from '../../styles/utils.js';
import cssVars from '../../styles/variables/index.js';

const PROP_TYPES = {
  overlayWidth: PropTypes.number.isRequired,
};
const DEFAULT_PROPS = {
  overlayWidth: 0.1,
};

const styleVars = {
  ...cssVars,
};

/**
 * Styled-Components CSS
 */
const wrapperPseudo = css`
  // Border & Background image
  &::before,
  &::after {
    content: '';
    position: fixed;
    z-index: -1;
    top: ${addPx(styleVars.wrapper.sm.space, styleVars.wrapper.sm.borderWidth)};
    right: ${addPx(styleVars.wrapper.sm.space, styleVars.wrapper.sm.borderWidth)};
    bottom: ${addPx(styleVars.wrapper.sm.space, styleVars.wrapper.sm.borderWidth)};
    left: ${addPx(styleVars.wrapper.sm.space, styleVars.wrapper.sm.borderWidth)};
    transition: transform ${styleVars.animation.speed.default} ${styleVars.animation.easing.default};

    @media (min-width: ${cssVars.breakpoint.sm}) {
      top: ${addPx(styleVars.wrapper.lg.space, styleVars.wrapper.lg.borderWidth)};
      right: ${addPx(styleVars.wrapper.lg.space, styleVars.wrapper.lg.borderWidth)};
      bottom: ${addPx(styleVars.wrapper.lg.space, styleVars.wrapper.lg.borderWidth)};
      left: ${addPx(styleVars.wrapper.lg.space, styleVars.wrapper.lg.borderWidth)};
    }
  }

  &::before {
    background: transparent url('/images/topographic-bg.jpg') 50% 50% repeat;
    opacity: 0.3;
  }

  &::after {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scaleX(${props => props.overlayWidth || '0.5'});
    transform-origin: 100% 0;
  }
`;

const WrapperEl = styled.main`
  position: fixed;
  overflow: auto;
  border: ${styleVars.wrapper.sm.borderWidth} solid ${styleVars.wrapper.borderColor};
  top: ${styleVars.wrapper.sm.space};
  right: ${styleVars.wrapper.sm.space};
  bottom: ${styleVars.wrapper.sm.space};
  left: ${styleVars.wrapper.sm.space};
  padding: ${addPx(styleVars.header.sm.height, styleVars.wrapper.sm.padding)} ${styleVars.wrapper.sm.padding} ${styleVars.wrapper.sm.padding};

  @media (min-width: ${cssVars.breakpoint.sm}) {
    border-width: ${styleVars.wrapper.lg.borderWidth};
    top: ${styleVars.wrapper.lg.space};
    right: ${styleVars.wrapper.lg.space};
    bottom: ${styleVars.wrapper.lg.space};
    left: ${styleVars.wrapper.lg.space};
    padding: ${addPx(styleVars.header.lg.height, styleVars.wrapper.lg.padding)} ${styleVars.wrapper.lg.padding} ${styleVars.wrapper.lg.padding};
  }

  ${wrapperPseudo}
`;

const Wrapper = (props) => {

  return (
    <WrapperEl {...props} className="wrapper">
      {props.children}
    </WrapperEl>
  )
};

Wrapper.propTypes = PROP_TYPES;
Wrapper.defaultProps = DEFAULT_PROPS;

export default Wrapper;
