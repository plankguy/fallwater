import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import PrismicApp from './PrismicApp';

import './index.css';
import 'normalize.css';

ReactDOM.render(
  <Router>
    <PrismicApp />
  </Router>,
  document.getElementById('root'),
);
