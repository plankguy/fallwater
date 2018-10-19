import React from 'react';
import ReactDOM from 'react-dom';
import StaticApp from './StaticApp';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><StaticApp /></Router>, div);
});
