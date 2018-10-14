import React from 'react';
import styled, { css } from 'styled-components';

import cssVars from '../../styles/variables/index.js';

const theme = {
  ...cssVars,
};

/**
 * Styled-Components CSS
 */
const StyledFooter = styled.footer`
  ${(props) => props.footerDimensions}

  font-size: ${theme.footer.lg.fontSize};
  text-align: left;
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
