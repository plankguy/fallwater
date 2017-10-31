import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { bemClasses } from '../../libs/UiHelpers'

import './Nav.css';

const PROP_TYPES = {
  parentClassName: PropTypes.string,
};

const DEFAULT_PROPS = {
  parentClassName: '',
};

const Nav = (props) => {
  const baseClass = 'Nav';

  return (
    <nav className={bemClasses(baseClass, props.parentClassName)}>
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
            to="/about"
            className={`${baseClass}__link`}
            activeClassName="is-active"
          >
            About
          </NavLink>
        </li>
        {/*
        <li className={`${baseClass}__item`}>
          <NavLink
            to="/preview"
            className={`${baseClass}__link`}
            activeClassName="is-active"
          >
            Preview
          </NavLink>
        </li>
        */}
      </ul>
    </nav>
  )
};

Nav.propTypes = PROP_TYPES;
Nav.defaultProps = DEFAULT_PROPS;

export default Nav;
