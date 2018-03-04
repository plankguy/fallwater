import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const PROP_TYPES = {
  isMenuOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

const DEFAULT_PROPS = {
  isMenuOpen: false,
};

const MenuTransition = ({ isMenuOpen, children }) => {

  return (
    <CSSTransition
      in={isMenuOpen}
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
