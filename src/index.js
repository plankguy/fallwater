import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import PrismicApp from './containers/PrismicApp';
// import App from './containers/App/App';

import 'normalize.css';
import './index.css';

ReactDOM.render(
  <Router>
    <PrismicApp />
  </Router>,
  document.getElementById('root'),
);

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root'),
// );
