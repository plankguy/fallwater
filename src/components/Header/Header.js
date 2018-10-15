import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Nav from '../../components/Nav';
import Logo from '../../components/Logo/Logo';
import Social from '../../components/Social';
import { addPx } from '../../styles/utils.js';
import cssVars from '../../styles/variables/index.js';

// import './Header.css';

const PROP_TYPES = {};

const DEFAULT_PROPS = {};

const theme = {
  ...cssVars,
};

/**
 * Styled-Components CSS
 */
const StyledHeader = styled.header`
  /* // @NOTE: headerDimensions passed from wrapper.js */
  ${(props) => props.headerDimensions}
  padding: 20px;
  display: flex;
  align-items: center;

  z-index: 90;
  /* margin: ${theme.header.lg.padding}; */
  /* background: rgba(255, 255, 100, 0.5); */
  /* top: ${addPx(theme.wrapper.sm.borderWidth, theme.wrapper.sm.space)};
  left: ${addPx(theme.wrapper.sm.borderWidth, theme.wrapper.sm.space)};
  right: ${addPx(theme.wrapper.sm.borderWidth, theme.wrapper.sm.space)}; */

  @media (min-width: ${cssVars.breakpoint.sm}) {
    /* top: ${addPx(theme.wrapper.lg.borderWidth, theme.wrapper.lg.space)};
    left: ${addPx(theme.wrapper.lg.borderWidth, theme.wrapper.lg.space)};
    right: ${addPx(theme.wrapper.lg.borderWidth, theme.wrapper.lg.space)}; */
  }
`;

const StyledLogo = styled(Logo)`
`;

const StyledNav = styled(Nav)`
`;

const StyledSocial = styled(Social)`
  margin-left: auto;
`;

const Header = (props) => {

  return (
    <StyledHeader {...props}>
      <StyledLogo />
      <StyledNav items={[]} />
      <StyledSocial />
    </StyledHeader>
  )
};

Header.propTypes = PROP_TYPES;
Header.defaultProps = DEFAULT_PROPS;

export default Header;
