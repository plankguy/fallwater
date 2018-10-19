import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import Nav from '../../components/Nav';
import Logo from '../../components/Logo/Logo';
import Social from '../../components/Social';
import val from '../../styles/utils.js';
import * as theme from '../../styles/variables/index.js';

const PROP_TYPES = {};
const DEFAULT_PROPS = {};

/**
 * Styled-Components CSS
 */
const StyledHeader = styled.header`
  /* // @NOTE: headerDimensions css passed from wrapper.js */
  ${(props) => props.headerDimensions}
  padding: 20px;
  display: flex;
  align-items: center;
  z-index: 90;

  @media (min-width: ${val(theme.breakpoint.sm)}) {}
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
    <StyledHeader {...props} className="Header">
      <StyledLogo />
      <StyledNav items={[]} />
      <StyledSocial />
    </StyledHeader>
  )
};

Header.propTypes = PROP_TYPES;
Header.defaultProps = DEFAULT_PROPS;

export default Header;
