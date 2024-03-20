import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import {store} from "./reducers";
import {Provider} from 'react-redux'
import './server_files/response_errors_handlers'
import './server_files/request_auth_handlers'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
