import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './palette.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import { fetchUserCategories } from './CharacterPanel/slice/thunks/fetchUserCategories';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

store.dispatch(fetchUserCategories());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
