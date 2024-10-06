import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createStore } from "redux";
import counterReducer from "./reducers/counter.js";
import isLoginReducer from "./reducers/isLogin.js";
import allReducers from "./reducers/index.js";
import { Provider } from "react-redux";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); //この第２引数のおかげで開発者ツールでstateを見ることができる

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* / このproviderで全てのコンポーネントにアクセスできるようになる */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
