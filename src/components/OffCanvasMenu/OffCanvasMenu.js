import React from 'react';
import PropTypes from 'prop-types';

import './OffCanvasMenu.css';

const PROP_TYPES = {
  parentClass: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
};

const DEFAULT_PROPS = {
  parentClass: '',
  isOpen: false,
};

const OffCanvasMenu = (props) => {
  const baseClass = 'OffCanvasMenu';

  return (
    <div
      className={`${baseClass} ${props.parentClass}__${baseClass}${props.isOpen ? ' is-open' : ''}`}
      onClick={props.clickHandler}
    >
      Menu
    </div>
  )
};

OffCanvasMenu.propTypes = PROP_TYPES;
OffCanvasMenu.defaultProps = DEFAULT_PROPS;

export default OffCanvasMenu;
