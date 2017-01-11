import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './index.css';

declare var module: {
  hot: {
    accept: (path: string, callback: () => void) => void
  }
};

const rootEl = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept(
    './App', () => {
      const NextApp = require('./App').default;
      ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        rootEl
      );
    }
  );
}