import { ADD, MINUS } from "../constants";
// 增加 state 次数的方法
export const add = num => ({
  type: ADD,
  num
});
export const minus = num => ({
  type: MINUS,
  num
});
