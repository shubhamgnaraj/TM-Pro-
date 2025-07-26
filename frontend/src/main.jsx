import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {Provider} from 'react-redux'
import store from "./store/store.js";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store} >
  <AuthProvider>
    <App />
  </AuthProvider>
  </Provider>
);
