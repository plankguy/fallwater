import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import './Button.css';

const PROP_TYPES = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['a', 'button', 'input']),
  link: PropTypes.shape({
    url: PropTypes.string,
    target: PropTypes.oneOf(['_blank', '_self']),
  }),
  onClick: PropTypes.func,
};

const DEFAULT_PROPS = {
  label: 'Button...',
  type: 'a',
  link: {
    url: '#',
    target: '_self'
  },
};

const buttonResetCss = css`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  cursor: pointer;
  -webkit-appearance: button; /* for input */
  -webkit-user-select: none; /* for button */
  -moz-user-select: none;
  -ms-user-select: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

const buttonStyleCss = css`
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  padding: 2px 8px;
  /* border-radius: 2px; */
  /* position: absolute; */
  /* right: 15px; */
  /* left: 100%; */
  opacity: 0.3;
  transition: opacity 300ms ease;

  &:hover {
    opacity: 1;
  }
`;

const Button = ({ type, label, link, onClick }) => {
  let markup;

  switch (type) {
    case 'button':
      markup = (
        <button
          className="Button"
          href="#"
          onClick={onClick}
        >
          {label}
        </button>
      );
      break;
    case 'input':
      markup = (
        <input
          className="Button"
          type="button"
          label={label}
          onClick={onClick}
        />
      );
      break;
    default:
      markup = (
        <a
          className="Button"
          href="{link.url}"
          onClick={onClick}
        >
          {label}
        </a>
      );
  }

  return markup;
};

// const Button = ({ type, label }) => (
//   <button className="Button">
//     {label}
//   </button>
// );

Button.propTypes = PROP_TYPES;
Button.defaultProps = DEFAULT_PROPS;

export default Button;
