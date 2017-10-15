import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

const PROP_TYPES = {
  // Nav: PropTypes.oneOfType([
  //   PropTypes.node,
  //   PropTypes.element,
  //   PropTypes.func, // functional components
  // ]).isRequired,
  // Hamburger: PropTypes.oneOfType([
  //   PropTypes.node,
  //   PropTypes.element,
  //   PropTypes.func, // functional components
  // ]).isRequired,
};

const DEFAULT_PROPS = {};

const Header = (props) => {
  const { children, Nav, Hamburger } = props;
  const baseClass = 'Header';
  console.log('props', props, 'React.cloneElement', React.cloneElement);

  return (
    <header className={baseClass}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          parentClass: baseClass,
          ...child.props,
        })
      )}
    </header>
  )
};

Header.propTypes = PROP_TYPES;
Header.defaultProps = DEFAULT_PROPS;

export default Header;
