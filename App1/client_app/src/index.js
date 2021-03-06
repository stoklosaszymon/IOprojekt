import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "./react-auth0-spa";
import config from './auth_config.json'
import history from "./utils/history";
import "./index.css";
import "./App.css";
import { Provider } from 'react-redux';
import { store } from './store'

const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Auth0Provider
                domain={config.domain}
                client_id={config.clientId}
                audience={config.audience}
                redirect_uri={window.location.origin}
                onRedirectCallback={onRedirectCallback}
            >
                <App />
            </Auth0Provider>,
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();