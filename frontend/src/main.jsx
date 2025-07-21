import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import store from "./store/store.js";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store} >
  <BrowserRouter>
  <AuthProvider>
    <App />

  </AuthProvider>
  </BrowserRouter>
  </Provider>
);
