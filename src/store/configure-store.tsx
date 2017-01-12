import { createStore, applyMiddleware, compose } from 'redux';
import { Store } from 'redux';
import { AppState } from './app-state';
import thunk from 'redux-thunk';
import reducer from './reducers';

declare var module: {
    hot: {
        accept: (path: string, callback: () => void) => void
    }
};

declare const window: {
    devToolsExtension: () => any
};

const enhancer = compose(
    applyMiddleware(thunk), 
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

let store: Store<AppState>;

export default function configureStore(initialState: AppState): Store<AppState> {
    if (store == null) {
        store = createStore(reducer, initialState, enhancer);
    }

    // When using WebPack, module.hot.accept should be used. In LiveReactload,
    // same result can be achieved by using "module.onReload" hook.
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers.tsx');
            store.replaceReducer(nextReducer.default || nextReducer);

            // return true to indicate that this module is accepted and
            // there is no need to reload its parent modules
            return true;
        });
    }

    return store;
}