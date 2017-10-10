import React from 'react';

import './Loading.css';

const PROP_TYPES = {};

const DEFAULT_PROPS = {};

const Loading = () => (
  <div className="Loading">
    <div className="Loading__bounce1"></div>
    <div className="Loading__bounce2"></div>
  </div>
);

Loading.propTypes = PROP_TYPES;
Loading.defaultProps = DEFAULT_PROPS;

export default Loading;
