import {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
  memo,
  useMemo,
  useCallback
} from "react";
import MyContext from "../lib/my-Context";
import { connect } from "react-redux";
function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
}

function Count({ countFromStore }) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("lijianhui");

  const context = useContext(MyContext);
  const inputRef = useRef();
  useEffect(() => {
    return () => {
      console.log("end");
    };
  }, []);
  const config = useMemo(
    () => ({
      color: count > 3 ? "red" : "blue",
      text: `my count is ${count}`
    }),
    [count]
  );
  const handleMyClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <h1>
        <p>{count}</p>
        <button
          onClick={() => {
            setCount(c => c + 1);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          -
        </button>
      </h1>
      <div>
        <input
          type="text"
          ref={inputRef}
          onChange={e => {
            setName(e.target.value);
          }}
          value={name}
        />
      </div>
      <p>123{context}</p>
      <Child config={config} onButtonClick={handleMyClick} />

      <div>countFromStore:{countFromStore}</div>
    </div>
  );
}

const Child = memo(function Child({ onButtonClick, config }) {
  console.log("child render");
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  );
});
function mapStateToprops(state) {
  return {
    countFromStore: state.count
  };
}
export default connect(mapStateToprops)(Count);
