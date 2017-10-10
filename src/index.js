import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import PrismicApp from './PrismicApp';
// import App from './App';

import 'normalize.css';
import './index.css';

// ReactDOM.render(
//   <PrismicApp />,
//   document.getElementById('root'),
// );

ReactDOM.render(
  <Router>
    <PrismicApp />
  </Router>,
  document.getElementById('root'),
);
