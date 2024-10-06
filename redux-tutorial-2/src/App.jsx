import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, login } from "./actions";

function App() {
  const counter = useSelector((state) => state.counter);
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <h1>APP</h1>
      <h3>カウント:{counter}</h3>
      {isLogin ? <h3>ログインに成功</h3> : <h3>ログインしてください</h3>}
      <button onClick={() => dispatch(increment(10))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(login())}>ログイン</button>
    </div>
  );
}

export default App;
