import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { bemClasses } from '../../libs/UiHelpers'

import './Nav.css';

const PROP_TYPES = {
  parentClassName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const DEFAULT_PROPS = {
  parentClassName: '',
};

const Nav = (props) => {
  const baseClass = 'Nav';

  return (
    <nav className={bemClasses(baseClass, props.parentClassName)}>
      <ul className={`${baseClass}__list`}>
        {props.items.map((item, i) => (
            <li className={`${baseClass}__item`} key={i}>
              <NavLink
                to={item.url}
                className={`${baseClass}__link`}
                activeClassName="is-active"
                exact={item.exact ? true : false}
              >
                {item.label}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </nav>
  )
};

Nav.propTypes = PROP_TYPES;
Nav.defaultProps = DEFAULT_PROPS;

export default Nav;
