import React from 'react';
import PropTypes from 'prop-types';

import { bemClasses } from '../../libs/UiHelpers'

import './Logo.css';

const PROP_TYPES = {
  parentClassName: PropTypes.string,
};

const DEFAULT_PROPS = {
  parentClassName: '',
};

const Logo = (props) => {
  const baseClass = 'Logo';

  return (
    <div className={bemClasses(baseClass, props.parentClassName)}>
      {props.children}
    </div>
  );
}

Logo.propTypes = PROP_TYPES;
Logo.defaultProps = DEFAULT_PROPS;

export default Logo;
