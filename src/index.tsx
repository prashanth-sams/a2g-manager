import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './../node_modules/font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { store } from "./store/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
