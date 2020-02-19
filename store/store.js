import { createStore, applyMiddleware } from "redux"; // 引入createStore方法
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";

import { initCount } from "./reducers/count";
import {userInitialState} from "./reducers/user"
export default function initialzeStore(state) {
  const store = createStore(
    reducers,
    Object.assign(
      {},
      {
        count: initCount,
        user:userInitialState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))

  ); // 创建数据存储仓库
  // store.dispatch({ type: "ADD", num: 3 });
  function asyncAdd(num) {
    console.log("___________________");

    return dispatch => {
      setTimeout(() => {
        dispatch({ type: "ADD", num });
      }, 1000);
    };
  }
  // store.dispatch(asyncAdd(5));
  return store;
}
