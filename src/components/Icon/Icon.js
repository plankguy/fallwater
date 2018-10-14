import React from 'react';
import PropTypes from 'prop-types';

const PROP_TYPES = {
  glyph: PropTypes.any.isRequired,
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  preserveAspectRatio: PropTypes.string,
  className: PropTypes.string,
};

const DEFAULT_PROPS = {
  fill: '#FFF',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  preserveAspectRatio: 'xMidYMid meet',
  className: 'icon',
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
}) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    viewBox={viewBox}
    preserveAspectRatio={preserveAspectRatio}
    className={className}
  >
    {glyph()}
  </svg>
);

Icon.propTypes = PROP_TYPES;
Icon.defaultProps = DEFAULT_PROPS;

export default Icon;
