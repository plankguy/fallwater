import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import val, { add } from '../../styles/utils.js';
import * as theme from '../../styles/variables/index.js';

const PROP_TYPES = {
  overlayWidth: PropTypes.number.isRequired,
};
const DEFAULT_PROPS = {
  overlayWidth: 0.4,
};

/**
 * Styled-Components CSS
 */

// Header
const headerDimensions = css`
  grid-area: header;
  position: fixed;
  height: ${val(theme.header.sm.height)};
  left: ${val(theme.wrapper.sm.inset)};
  right: ${val(theme.wrapper.sm.inset)};

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    height: ${val(theme.header.lg.height)};
    left: ${val(theme.wrapper.lg.inset)};
    right: ${val(theme.wrapper.lg.inset)};
  }
`;

// Footer
const footerDimensions = css`
  padding: ${val(theme.footer.sm.padding)};
  height: ${val(theme.footer.sm.height)};
  grid-area: footer;

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    height: ${val(theme.footer.lg.height)};
    padding: ${val(theme.footer.lg.padding)};
  }
`;

// Wrapper border & inset
const wrapperPseudo = css`
  &::before,
  &::after {
    content: '';
    position: fixed;
    z-index: -1;
    top: ${add([theme.wrapper.sm.space, theme.wrapper.sm.borderWidth])};
    right: ${add([theme.wrapper.sm.space, theme.wrapper.sm.borderWidth])};
    bottom: ${add([theme.wrapper.sm.space, theme.wrapper.sm.borderWidth])};
    left: ${add([theme.wrapper.sm.space, theme.wrapper.sm.borderWidth])};
    transition: transform ${val(theme.animation.speed.default)} ${val(theme.animation.easing.default)};
    overflow: auto;

    @media (min-width: ${val(theme.breakpoint.sm)}) {
      top: ${add([theme.wrapper.lg.space, theme.wrapper.lg.borderWidth])};
      right: ${add([theme.wrapper.lg.space, theme.wrapper.lg.borderWidth])};
      bottom: ${add([theme.wrapper.lg.space, theme.wrapper.lg.borderWidth])};
      left: ${add([theme.wrapper.lg.space, theme.wrapper.lg.borderWidth])};
    }
  }

  &::before {
    // @TODO replace w/ proper image
    background: transparent url('/images/topographic-pattern.jpg') 50% 50% repeat;
    background-size: 80%;
    opacity: 0.3;

    @media (min-width: ${val(theme.breakpoint.sm)}) {
      background-size: 30%;
    }
  }

  &::after {
    background-color: rgba(0, 0, 0, 0.3);
    transform: scaleX(${props => props.overlayWidth || '0.5'});
    transform-origin: 100% 0;
  }
`;

// Wrapper
const Main = styled.main`
  height: calc(100vh - ${add([theme.wrapper.lg.inset, theme.wrapper.lg.inset])});
  ${wrapperPseudo}
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: ${val(theme.header.sm.height)} 1fr ${val(theme.footer.sm.height)}
  grid-template-columns: 100%;
  grid-template-areas: 'header' 'content' 'footer';
  grid-gap: ${val(theme.spacing.base)};
  min-height: 100%;

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    grid-template-rows: ${val(theme.header.lg.height)} 1fr ${val(theme.footer.lg.height)}
    grid-template-columns: 100%;
  }
`;

const Wrapper = (props) => {
  const { children } = props;

  return (
    <Main {...props} className="Wrapper">
      <Grid>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            headerDimensions,
            footerDimensions,
          })
        )}
      </Grid>
    </Main>
  )
};

Wrapper.propTypes = PROP_TYPES;
Wrapper.defaultProps = DEFAULT_PROPS;

export default Wrapper;
