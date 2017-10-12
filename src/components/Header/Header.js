import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

const PROP_TYPES = {
  Nav: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func, // functional components
  ]).isRequired,
  Hamburger: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func, // functional components
  ]).isRequired,
};

const DEFAULT_PROPS = {};

const Header = ({ children, Nav, Hamburger }) => (
  <header className="Header">
    <div className="Header__nav">
      <Nav />
    </div>
    <div className="Header__hamburger">
      <Hamburger />
    </div>
  </header>
);

Header.propTypes = PROP_TYPES;
Header.defaultProps = DEFAULT_PROPS;

export default Header;
