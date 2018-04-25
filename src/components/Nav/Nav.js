import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { multiplyPx, addPx, unitOperation } from '../../styles/utils.js';
import cssVars from '../../styles/variables/index.js';
import { bemClasses } from '../../libs/UiHelpers'

// import './Nav.css';

const PROP_TYPES = {
  parentClassName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  overlayWidth: PropTypes.number.isRequired,
};

const DEFAULT_PROPS = {
  parentClassName: '',
  overlayWidth: 0.1,
};

const styleVars = {
  ...cssVars,
};

/**
 * Styled-Components CSS
 */
const NavEl = styled.nav`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);

  @media (min-width: ${cssVars.breakpoint.sm}) {
    // transform: translateX(${props => props.overlayWidth * 100}vw);
    transform: translate(calc(${props => props.overlayWidth * 100}vw - ${addPx(styleVars.spacing.base, styleVars.wrapper.lg.borderWidth)} - ${styleVars.header.lg.padding}), -50%);
    padding-left: ${multiplyPx(cssVars.spacing.base, 2)};
  }

  .Logo {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 100px;
    text-align: right;
    left: calc(-${multiplyPx(cssVars.spacing.base, 2)} - 100px);
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
  margin: 0;
  padding: 0;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-indent: 0.1em;
  font-size: 14px;
  font-weight: 400;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;

  & + & {
    margin-left: 30px;
  }
`;

const activeClassName = 'is-active';
const NavAnchor = styled(NavLink).attrs({
    activeClassName
  })`

  color: inherit;
  text-decoration: none;
  display: inline-block;
  padding: ${styleVars.header.lg.padding} 0;
  margin: 0;
  position: relative;
  transition: color 5000ms;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 28px;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 1);
    transform: scale(0, 1);
    transform-origin: 0 0;
    transition: transform 300ms ease-out;
  }

  &.${activeClassName} {

    &::after {
      border-bottom-color: rgba(255, 255, 255, 1);
      transform: scale(1.0, 1.0);
    }
  }
`;

const Nav = (props) => {
  const baseClass = 'Nav';
  const { overlayWidth, children } = props;

  return (
    <NavEl {...props} className={bemClasses(baseClass, props.parentClassName)}>
      {children}
      <NavList className={`${baseClass}__list`}>
        {props.items.map((item, i) => (
            <NavItem className={`${baseClass}__item`} key={i}>
              <NavAnchor
                to={item.url}
                className={`${baseClass}__link`}
                activeClassName="is-active"
                exact={item.exact ? true : false}
              >
                {item.label}
              </NavAnchor>
            </NavItem>
          )
        )}
      </NavList>
    </NavEl>
  )
};

Nav.propTypes = PROP_TYPES;
Nav.defaultProps = DEFAULT_PROPS;

export default Nav;
