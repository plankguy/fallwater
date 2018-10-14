import styled, { css } from 'styled-components';

import cssVars from '../../styles/variables/index.js';

const styleVars = {
  ...cssVars,
};

/**
 * Styled-Components CSS
 */
const Content = styled.section`
  grid-row: 2 / 3;
  align-self: stretch;
`;

export default Content;
