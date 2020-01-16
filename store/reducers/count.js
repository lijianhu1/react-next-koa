import { ADD, MINUS } from "../constants";
export const initCount = 0;
// 处理并返回 state
export default (state = initCount, action) => {
  switch (action.type) {
    case ADD:
      return state + (action.num || 1);
    case MINUS:
      return state - (action.num || 1);
    default:
      return state;
  }
};
