import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"
import { GoogleOAuthProvider} from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="55094331842-isk4lcajk8ermsv9vkenn6eia49hoq45.apps.googleusercontent.com">
          <App/>
          </GoogleOAuthProvider>
        </BrowserRouter>
      
    </Provider>
);

