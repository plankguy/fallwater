import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

const PROP_TYPES = {};

const DEFAULT_PROPS = {};

const Footer = () => (
  <footer className="Footer">
    &copy; Jeff Waterfall {(new Date()).getFullYear()}. All rights reserved.
  </footer>
);

Footer.propTypes = PROP_TYPES;
Footer.defaultProps = DEFAULT_PROPS;

export default Footer;
