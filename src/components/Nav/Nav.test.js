import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Nav items={[]}>Test</Nav>, div);
  ReactDOM.unmountComponentAtNode(div);
});
