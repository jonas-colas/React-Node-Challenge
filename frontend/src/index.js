import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// juan@gogrow.dev
// freddy@gogrow.dev
// https://www.figma.com/file/yCzppAXVSd8RSutKxEuDwa/Sign-up-Page-UI-(Community)?node-id=0%3A1
// https://we.tl/t-y1qujycf7e

