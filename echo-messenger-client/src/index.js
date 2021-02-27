import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.querySelector("#root")
);

console.log("Stripe key is:", process.env.REACT_APP_STRIPE_PUB_KEY);
console.log("Enviroment key is:", process.env.NODE_ENV);
