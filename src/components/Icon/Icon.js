import React from 'react';
import PropTypes from 'prop-types';

import { randomString } from '../../libs/helpers';

const PROP_TYPES = {
  glyph: PropTypes.func.isRequired,
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  preserveAspectRatio: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};

const DEFAULT_PROPS = {
  fill: '#FFF',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  preserveAspectRatio: 'xMidYMid meet',
  className: 'icon',
  title: null,
};

/**
 * SVG icon component
 * @param {Object} props
 * @param {Function} props.glyph
 * @param {string} props.fill
 * @param {number} props.width
 * @param {number} props.height
 * @param {string} props.viewBox
 * @returns {ReactElement}
 */
const Icon = ({
  glyph,
  fill,
  width,
  height,
  viewBox,
  preserveAspectRatio,
  className,
  title,
}) => {
  const id = title ? `${glyph.name.toLowerCase().trim().replace(' ', '')}-${randomString(5)}` : null;
  return (
    <svg
      fill={fill}
      width={width}
      height={height}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      aria-labelledby={id}
    >
      {title &&
        <title id={id}>{title}</title>
      }
      {glyph()}
    </svg>
  );
};

Icon.propTypes = PROP_TYPES;
Icon.defaultProps = DEFAULT_PROPS;

export default Icon;
