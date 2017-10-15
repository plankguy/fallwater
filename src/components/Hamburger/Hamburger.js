import React from 'react';
import PropTypes from 'prop-types';

import './Hamburger.css';

const PROP_TYPES = {
  parentClass: PropTypes.string,
};

const DEFAULT_PROPS = {
  parentClass: '',
};

const Hamburger = (props) => {
  const baseClass = 'Hamburger';

  return (
    <button className={`${baseClass} ${props.parentClass}__${baseClass}`}>
      <span className={`${baseClass}__patties`}></span>
    </button>
  )
};

Hamburger.propTypes = PROP_TYPES;
Hamburger.defaultProps = DEFAULT_PROPS;

export default Hamburger;
