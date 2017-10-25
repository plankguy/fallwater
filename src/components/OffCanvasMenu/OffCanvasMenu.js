import React from 'react';
import PropTypes from 'prop-types';

import { bemClasses } from '../../libs/UiHelpers'

import './OffCanvasMenu.css';

const PROP_TYPES = {
  parentClassName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const DEFAULT_PROPS = {
  parentClassName: '',
  isOpen: false,
};

const OffCanvasMenu = (props) => {
  const baseClass = 'OffCanvasMenu';

  return (
    <div
      className={bemClasses(baseClass, props.parentClassName, [props.isOpen ? 'is-open' : ''])}
      onClick={props.clickHandler}
    >
      Menu item<br />
      Menu item<br />
      Menu item<br />
      Menu item
    </div>
  )
};

OffCanvasMenu.propTypes = PROP_TYPES;
OffCanvasMenu.defaultProps = DEFAULT_PROPS;

export default OffCanvasMenu;
