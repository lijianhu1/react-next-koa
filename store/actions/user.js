/**
 * Created by Administrator on 2020/2/5.
 */
import axios from "axios";
import {LOGOUT} from "../constants";
export const logout = () =>{
      return dispatch =>{
            axios.post("/logout").then(resp=>{
                  console.log(resp)
                  if (resp.status ===200){
                      dispatch({
                          type:LOGOUT
                      })
                  }
            }).catch(err=>{
                  console.log(err)
            })
      }
};