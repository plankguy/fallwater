import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { formatFontFamilyMap, addPx } from '../../styles/utils.js';
import cssVars from '../../styles/variables/index.js';

const PROP_TYPES = {};
const DEFAULT_PROPS = {};

const styleVars = {
  ...cssVars,
  wrapper: {
    borderWidth: '10px',
    borderColor: cssVars.color.border,
  }
};

const Wrapper = (props) => {

  const wrapperPseudo = css`
    &::before,
    &::after {
      content: '';
      position: fixed;
      top: ${addPx(styleVars.spacing.base, styleVars.wrapper.borderWidth)};
      right: ${addPx(styleVars.spacing.base, styleVars.wrapper.borderWidth)};
      bottom: ${addPx(styleVars.spacing.base, styleVars.wrapper.borderWidth)};
      left: ${addPx(styleVars.spacing.base, styleVars.wrapper.borderWidth)};
      z-index: -1;
      transition: transform ${styleVars.animation.speed.default} ${styleVars.animation.easing.default};
    }

    &::before {
      background: transparent url('/images/topographic-bg.jpg') 50% 50% repeat;
      opacity: 0.3;
    }

    &::after {
      background-color: rgba(255, 255, 255, 0.3);
      transform: scaleX(${props.overlayWidth || '0.5'});
      transform-origin: 100% 0;
    }
  `;

  const WrapperEl = styled.main`
    position: fixed;
    top: ${styleVars.spacing.base};
    right: ${styleVars.spacing.base};
    bottom: ${styleVars.spacing.base};
    left: ${styleVars.spacing.base};
    padding: ${styleVars.spacing.base};
    overflow: auto;
    border: ${styleVars.wrapper.borderWidth} solid ${styleVars.wrapper.borderColor};
    font-family: ${formatFontFamilyMap(styleVars.font.family)};

    ${wrapperPseudo}
  `;

  return (
    <WrapperEl {...props} className="wrapper">
      {props.children}
    </WrapperEl>
  )
};

Wrapper.propTypes = PROP_TYPES;
Wrapper.defaultProps = DEFAULT_PROPS;

export default Wrapper;
