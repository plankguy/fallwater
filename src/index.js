import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

// import PrismicApp from './containers/PrismicApp'; // App Wrapper w/ Prismic Context
// import App from './containers/App/App'; // App
import StaticApp from './containers/StaticApp'; // Static App

import 'normalize.css';
import './index.css';

ReactDOM.render(
  <Router>
    <StaticApp />
  </Router>,
  document.getElementById('root'),
);

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root'),
// );
