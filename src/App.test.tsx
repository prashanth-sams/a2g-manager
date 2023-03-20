import * as React from 'react';
import * as createRoot from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot.render(<App />, div);
  createRoot.unmountComponentAtNode(div);
});
