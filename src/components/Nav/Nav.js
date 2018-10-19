import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import val, { add } from '../../styles/utils.js';
import * as theme from '../../styles/variables/index.js';

// import './Nav.css';

const PROP_TYPES = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  overlayWidth: PropTypes.number.isRequired,
};

const DEFAULT_PROPS = {
  overlayWidth: 0.1,
};

/**
 * Styled-Components CSS
 */
const NavEl = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${val(theme.header.lg.height)};
  /* position: absolute; */
  /* top: 50%; */
  /* transform: translate(0, -50%); */

  @media (min-width: ${val(theme.breakpoint.sm)}) {
    transform: translate(
      calc(
        ${(props) => 100 - props.overlayWidth * 100}vw
        - ${add([theme.spacing.base, theme.wrapper.lg.borderWidth])}
        - ${val(theme.header.lg.paddingX)}
      ), -50%);
    transition: transform ${val(theme.animation.speed.default)} ${val(theme.animation.easing.default)};
  }

  .Logo {
    padding: ${val(theme.header.lg.paddingY)} ${val(theme.spacing.base)};
    text-align: right;
  }
`;

const NavList = styled.ul`
  flex: 0 1 ${props => props.overlayWidth * 100}%;
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
  margin: 0;
  padding: 0 ${val(theme.spacing.base)};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-indent: 0.1em;
  font-size: 14px;
  font-weight: 400;
  transition: flex-basis ${val(theme.animation.speed.default)} ${val(theme.animation.easing.default)};
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;

  & + & {
    margin-left: ${val(theme.spacing.base)};
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
  padding: ${val(theme.header.lg.paddingY)} 0;

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
      bottom: ${val(theme.header.lg.paddingY)};
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
