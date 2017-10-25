import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

import './Header.css';

const PROP_TYPES = {};

const DEFAULT_PROPS = {};

const Header = (props) => {
  const { children } = props;
  const baseClass = 'Header';

  return (
    <header className={baseClass}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          ...child.props,
          parentClassName: baseClass,
        })
      )}
    </header>
  )
};

Header.propTypes = PROP_TYPES;
Header.defaultProps = DEFAULT_PROPS;

export default Header;
