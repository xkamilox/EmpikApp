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
      <GoogleOAuthProvider clientId="382749481827-ahbl6cgi9b4r92u12sgmbckgf3sue3jl.apps.googleusercontent.com">
          <App/>
          </GoogleOAuthProvider>
        </BrowserRouter>
      
    </Provider>
);

