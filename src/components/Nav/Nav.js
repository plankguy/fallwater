import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { multiplyPx, addPx, unitOperation } from '../../styles/utils.js';
import cssVars from '../../styles/variables/index.js';
import { bemClasses } from '../../libs/UiHelpers';

// import './Nav.css';

const PROP_TYPES = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  overlayWidth: PropTypes.number.isRequired,
};

const DEFAULT_PROPS = {
  overlayWidth: 0.1,
};

const theme = {
  ...cssVars,
};

/**
 * Styled-Components CSS
 */
const NavEl = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${theme.header.lg.height};
  /* position: absolute; */
  /* top: 50%; */
  /* transform: translate(0, -50%); */

  @media (min-width: ${theme.breakpoint.sm}) {
    /* transform: translateX(${(props) => props.overlayWidth * 100}vw); */
    transform: translate(calc(${(props) =>
      100 - props.overlayWidth * 100}vw - ${addPx(
        theme.spacing.base,
        theme.wrapper.lg.borderWidth,
      )} - ${theme.header.lg.padding}), -50%);
    /* padding-left: ${multiplyPx(theme.spacing.base, 2)}; */
    transition: transform ${theme.animation.speed.default} ${theme.animation.easing.default};
  }

  .Logo {
    /* position: absolute;
    top: 50%;
    transform: translate(${props => props.overlayWidth}, -50%);
    width: 100px;
    left: calc(-${multiplyPx(theme.spacing.base, 2)} - 100px); */
    padding: ${theme.header.lg.paddingY} ${theme.spacing.base};
    text-align: right;
  }
`;

const NavList = styled.ul`
  flex: 0 1 ${props => props.overlayWidth * 100}%;
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
  margin: 0;
  padding: 0 ${theme.spacing.base};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-indent: 0.1em;
  font-size: 14px;
  font-weight: 400;
  transition: flex-basis ${theme.animation.speed.default} ${theme.animation.easing.default};
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;

  & + & {
    margin-left: ${theme.spacing.base};
  }
`;

// Link
const activeClassName = 'is-active';
const NavAnchor = styled(NavLink).attrs({
  activeClassName,
})`
  color: inherit;
  text-decoration: none;
  display: inline-block;
  padding: ${theme.header.lg.paddingY} 0;

  margin: 0;
  position: relative;
  transition: color 600ms ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 50%;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 1);
    transform: scale(0, 1);
    transform-origin: 0 0;
    transition: transform 300ms ease-out, bottom 150ms ease-out 150ms;
    will-change: bottom;
  }

  &:not(.${activeClassName}):hover {
    &::after {
      transform: scale(1, 1);
    }
  }

  &.${activeClassName} {
    &::after {
      bottom: ${theme.header.lg.paddingY};
      transform: scale(1, 1);
    }
  }
`;

const Nav = (props) => {
  const { children, items } = props;

  return (
    <>
      {items.length > 0 &&
        <NavEl {...props}>
          {children}
          <NavList {...props}>
            {items.map((item, i) => (
              <NavItem key={i}>
                <NavAnchor
                  to={item.url}
                  activeClassName="is-active"
                  exact={item.exact ? true : false}
                >
                  {item.label}
                </NavAnchor>
              </NavItem>
            ))}
          </NavList>
        </NavEl>
      }
    </>
  );
};

Nav.propTypes = PROP_TYPES;
Nav.defaultProps = DEFAULT_PROPS;

export default Nav;
