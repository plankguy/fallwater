import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const PROP_TYPES = {
  menuOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

const DEFAULT_PROPS = {
  menuOpen: false,
};

const MenuTransition = ({ menuOpen, children }) => {

  return (
    <CSSTransition
      in={menuOpen}
      classNames={'is-menuopen-'}
      timeout={{
        enter: 200,
      }}
    >
      {children}
    </CSSTransition>
  )
};

MenuTransition.propTypes = PROP_TYPES;
MenuTransition.defaultProps = DEFAULT_PROPS;

export default MenuTransition;
