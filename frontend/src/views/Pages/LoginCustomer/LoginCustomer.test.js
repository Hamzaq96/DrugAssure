import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginCustomer from './Login';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><LoginCustomer/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
