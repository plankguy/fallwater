import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { formatFontFamilyMap, addPx, unitOperation } from '../../styles/utils.js';
import cssVars from '../../styles/variables/index.js';

const PROP_TYPES = {
  overlayWidth: PropTypes.number.isRequired,
};
const DEFAULT_PROPS = {
  overlayWidth: 0.4,
};

const theme = {
  ...cssVars,
};

/**
 * Styled-Components CSS
 */

// Header
const headerHeight = addPx(
  unitOperation(theme.spacing.base, 2, '*'),
  unitOperation(theme.font.size, 1.0, '*')
);
const headerDimensions = css`
  /* padding: ${theme.spacing.base} 0; */
  padding: 0;
  height: ${headerHeight};
  grid-area: header;
  position: fixed;
  left: ${theme.wrapper.lg.inset};
  right: ${theme.wrapper.lg.inset};
`;

// Footer
const footerheight = addPx(
  unitOperation(theme.spacing.base, 2, '*'),
  unitOperation(theme.footer.lg.fontSize, 1.0, '*')
);
const footerDimensions = css`
  padding: ${theme.spacing.base} ${theme.wrapper.lg.padding};
  height: ${footerheight};
  grid-area: footer;
`;

// Wrapper border & inset
const wrapperPseudo = css`
  /* Border & Background image */
  &::before,
  &::after {
    content: '';
    position: fixed;
    z-index: -1;
    top: ${addPx(theme.wrapper.sm.space, theme.wrapper.sm.borderWidth)};
    right: ${addPx(theme.wrapper.sm.space, theme.wrapper.sm.borderWidth)};
    bottom: ${addPx(theme.wrapper.sm.space, theme.wrapper.sm.borderWidth)};
    left: ${addPx(theme.wrapper.sm.space, theme.wrapper.sm.borderWidth)};
    transition: transform ${theme.animation.speed.default} ${theme.animation.easing.default};
    overflow: auto;


    @media (min-width: ${cssVars.breakpoint.sm}) {
      top: ${addPx(theme.wrapper.lg.space, theme.wrapper.lg.borderWidth)};
      right: ${addPx(theme.wrapper.lg.space, theme.wrapper.lg.borderWidth)};
      bottom: ${addPx(theme.wrapper.lg.space, theme.wrapper.lg.borderWidth)};
      left: ${addPx(theme.wrapper.lg.space, theme.wrapper.lg.borderWidth)};
    }
  }

  &::before {
    // @TODO replace w/ proper image
    background: transparent url('/images/topographic-bg.jpg') 50% 50% repeat;
    opacity: 0.3;
  }

  &::after {
    background-color: rgba(0, 0, 0, 0.3);
    transform: scaleX(${props => props.overlayWidth || '0.5'});
    transform-origin: 100% 0;
  }
`;

// Wrapper
const WrapperEl = styled.main`
  position: fixed;
  overflow: auto;
  border: ${theme.wrapper.sm.borderWidth} solid ${theme.wrapper.borderColor};
  top: ${theme.wrapper.sm.space};
  right: ${theme.wrapper.sm.space};
  bottom: ${theme.wrapper.sm.space};
  left: ${theme.wrapper.sm.space};
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.6) inset;
  /* padding: ${addPx(theme.header.sm.height, theme.wrapper.sm.padding)} ${theme.wrapper.sm.padding} ${theme.wrapper.sm.padding}; */

  display: grid;
  grid-template: ${headerHeight} 1fr ${footerheight} / 100%;
  grid-template-areas: 'header' 'content' 'footer';
  grid-gap: ${theme.wrapper.sm.padding};

  @media (min-width: ${cssVars.breakpoint.sm}) {
    border-width: ${theme.wrapper.lg.borderWidth};
    top: ${theme.wrapper.lg.space};
    right: ${theme.wrapper.lg.space};
    bottom: ${theme.wrapper.lg.space};
    left: ${theme.wrapper.lg.space};
    /* padding: ${addPx(theme.header.lg.height, theme.wrapper.lg.padding)} ${theme.wrapper.lg.padding} ${theme.wrapper.lg.padding}; */
  }

  ${wrapperPseudo}
`;

const Wrapper = (props) => {
  const { children } = props;

  return (
    <WrapperEl {...props} className="wrapper">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          headerDimensions,
          footerDimensions,
        })
      )}
    </WrapperEl>
  )
};

Wrapper.propTypes = PROP_TYPES;
Wrapper.defaultProps = DEFAULT_PROPS;

export default Wrapper;
