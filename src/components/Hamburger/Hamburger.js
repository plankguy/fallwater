import React from 'react';
import PropTypes from 'prop-types';

import { bemClasses } from '../../libs/UiHelpers'

import './Hamburger.css';

const PROP_TYPES = {
  parentClassName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

const DEFAULT_PROPS = {
  parentClassName: '',
  isOpen: false,
};

const Hamburger = (props) => {
  const baseClass = 'Hamburger';

  return (
    <button
      className={bemClasses(baseClass, props.parentClassName, [props.isOpen ? 'is-open' : ''])}
      onClick={props.clickHandler}
    >
      <span className={`${baseClass}__patties`}></span>
    </button>
  )
};

Hamburger.propTypes = PROP_TYPES;
Hamburger.defaultProps = DEFAULT_PROPS;

export default Hamburger;
