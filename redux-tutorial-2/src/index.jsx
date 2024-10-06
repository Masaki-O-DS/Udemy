import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createStore } from "redux";

//reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return -1;
    default:
      return state;
  }
};

//store
let store = createStore(counterReducer);

//actions    increment decrement
const increment = () => {
  return {
    type: "INCREMENT",
  };
};
const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

//コンソールに新しい状態を出力
store.subscribe(() => console.log(store.getState()));

//dispatch
store.dispatch(increment());
store.dispatch(increment());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
