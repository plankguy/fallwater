import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Nav.css';

const PROP_TYPES = {
  parentClass: PropTypes.string,
};

const DEFAULT_PROPS = {
  parentClass: '',
};

const Nav = (props) => {
  const baseClass = 'Nav';

  return (
    <nav className={`${baseClass} ${props.parentClass}__${baseClass}`}>
      <ul className={`${baseClass}__list`}>
        <li className={`${baseClass}__item`}>
          <NavLink
            to="/"
            className={`${baseClass}__link`}
            activeClassName="is-active"
            exact
          >
            Index
          </NavLink>
        </li>
        <li className={`${baseClass}__item`}>
          <NavLink
            to="/posts"
            className={`${baseClass}__link`}
            activeClassName="is-active"
          >
            Posts
          </NavLink>
        </li>
        <li className={`${baseClass}__item`}>
          <NavLink
            to="/it"
            className={`${baseClass}__link`}
            activeClassName="is-active"
          >
            It
          </NavLink>
        </li>
        <li className={`${baseClass}__item`}>
          <NavLink
            to="/Help"
            className={`${baseClass}__link`}
            activeClassName="is-active"
          >
            Help
          </NavLink>
        </li>
        <li className={`${baseClass}__item`}>
          <NavLink
            to="/preview"
            className={`${baseClass}__link`}
            activeClassName="is-active"
          >
            Preview
          </NavLink>
        </li>
      </ul>
    </nav>
  )
};

Nav.propTypes = PROP_TYPES;
Nav.defaultProps = DEFAULT_PROPS;

export default Nav;
