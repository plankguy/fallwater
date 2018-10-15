import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import GlobalConfig from '../../config/global';

const PROP_TYPES = {};

const DEFAULT_PROPS = {};

const Logo = (props) => {
  return (
    <div {...props}>
      <Link to="/">
        {GlobalConfig.siteName}
      </Link>
    </div>
  );
}

Logo.propTypes = PROP_TYPES;
Logo.defaultProps = DEFAULT_PROPS;

export default Logo;
