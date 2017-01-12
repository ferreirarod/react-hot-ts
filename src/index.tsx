import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureStore from './store/configure-store';
import { AppState } from './store/app-state';
import './index.css';

declare var module: {
  hot: {
    accept: (path: string, callback: () => void) => void
  }
};

const rootEl = document.getElementById('root') as HTMLElement;

let store: Store<AppState> = configureStore({});

const renderApp = () => {
  const NextApp = require('./App').default;
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <NextApp />
      </Provider>
    </AppContainer>,
    rootEl
  );
};

renderApp();

if (module.hot) {
  module.hot.accept(
    './App', () => {
      renderApp();
    }
  );
}