import { decrement, increment, login } from "./actions";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const counter = useSelector((state) => state.counter);
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <h1>Hello Redux</h1>
      <h3>カウント: {counter}</h3>
      <button onClick={() => dispatch(increment(7))}> + </button>
      <button onClick={() => dispatch(decrement())}> - </button>
      {isLogin ? <h3>ログインに成功</h3> : <h3>ログインしてください</h3>}
      {isLogin ? (
        <button onClick={() => dispatch(login())}>ログアウト</button>
      ) : (
        <button onClick={() => dispatch(login())}>ログイン</button>
      )}
    </div>
  );
}

export default App;
