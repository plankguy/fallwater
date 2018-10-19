import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import GlobalConfig from '../../config/global';
import * as theme from '../../styles/variables/index.js';
import { formatFontFamilyMap } from '../../styles/utils.js';
import val from '../../styles/utils.js';

const PROP_TYPES = {};

const DEFAULT_PROPS = {};

const StyledLogo = styled.div`
  font: oblique 600 16px/0 ${formatFontFamilyMap(theme.font.family.display)};

  /* a {
    color: ${theme.color};
    transition: color ${val(theme.animation.speed.default)} ${val(theme.animation.easing.default)};

    &:hover {
      color: ${val(theme.color.linkHover)};
    }
  } */
`;

const Logo = (props) => {
  return (
    <StyledLogo {...props}>
      <Link to="/">
        {GlobalConfig.siteName}
      </Link>
    </StyledLogo>
  );
}

Logo.propTypes = PROP_TYPES;
Logo.defaultProps = DEFAULT_PROPS;

export default Logo;
