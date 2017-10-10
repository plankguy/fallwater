import React from 'react';
import PropTypes from 'prop-types';

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
