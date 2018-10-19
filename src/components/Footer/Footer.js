import React from 'react';
import styled from 'styled-components';

import * as theme from '../../styles/variables/index.js';
import val from '../../styles/utils.js';

/**
 * Styled-Components CSS
 */
const StyledFooter = styled.footer`
  ${(props) => props.footerDimensions}

  font-size: ${val(theme.footer.lg.fontSize)};
  text-align: center;

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    text-align: left;
  }
`;
const StyledParagraph = styled.p`
  margin: 0;
  opacity: 0.5;
`;

// import './Footer.css';

const Footer = (props) => (
  <StyledFooter
    className="Footer"
    {...props}
  >
    <StyledParagraph>&copy; Jeff Waterfall {(new Date()).getFullYear()}. All rights reserved.</StyledParagraph>
  </StyledFooter>
);

export default Footer;
