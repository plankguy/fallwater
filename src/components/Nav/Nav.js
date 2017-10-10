import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Nav.css';

const PROP_TYPES = {
  title: PropTypes.string,
  body:  PropTypes.string,
  id:    PropTypes.number,
};

const DEFAULT_PROPS = {
  title: '',
  body:  '',
  id:    0,
};

const Nav = ({ title, body, id }) => (
  <nav className="Nav">
    <ul className="Nav__list">
      <li className="Nav__item">
        <NavLink
          to="/"
          className="Nav__link"
          activeClassName="is-active"
          exact
        >
          Index
        </NavLink>
      </li>
      <li className="Nav__item">
        <NavLink
          to="/posts"
          className="Nav__link"
          activeClassName="is-active"
        >
          Posts
        </NavLink>
      </li>
      <li className="Nav__item">
        <NavLink
          to="/it"
          className="Nav__link"
          activeClassName="is-active"
        >
          It
        </NavLink>
      </li>
      <li className="Nav__item">
        <NavLink
          to="/Help"
          className="Nav__link"
          activeClassName="is-active"
        >
          Help
        </NavLink>
      </li>
      <li className="Nav__item">
        <NavLink
          to="/preview"
          className="Nav__Link"
          activeClassName="is-active"
        >
          Preview
        </NavLink>
      </li>
    </ul>
  </nav>
);

Nav.propTypes = PROP_TYPES;
Nav.defaultProps = DEFAULT_PROPS;

export default Nav;
