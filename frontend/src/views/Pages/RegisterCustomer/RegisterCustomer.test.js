import React from 'react';
import ReactDOM from 'react-dom';
import RegisterCustomer from './RegisterCustomer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterCustomer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
