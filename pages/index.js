import Link from "next/link";
import { connect } from "react-redux";
import { add } from "../store/actions";
import getConfig from "next/config";
const {publicRuntimeConfig}  = getConfig();
import axios from "axios";
import {useEffect} from "react";

const api = require('../lib/api')
function Index({ count, addNum,user }) {
  useEffect(()=>{
      // api.getUserInfo(res=>{
      //     console.log(res)
      // })
    // axios.get("/api/user/info").then(resp=>{
    //     console.log(resp)
    // })
  },[]);
  return (
    <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
      <Link href={`/search`}>
        <a>A</a>
      </Link>
      <br />
      <Link href={`/count`}>
        <a>count</a>
      </Link>
      <p>{count}</p>
      <button
        onClick={() => {
          addNum(2);
        }}
      >
        add
      </button>
      <a href={publicRuntimeConfig.OAUTH_URL}>去登陆</a>
        <div>
            用户{JSON.stringify(user)}
        </div>
    </div>
  );
}
Index.getInitialProps = async ({ reduxStore }) => {
    api.getUserInfo(res=>{
        console.log(res)
    })
  return {
        // result
  };
};
function mapStateToProps(state) {
  return {
    count: state.count,
      user:state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addNum: num => dispatch(add(num))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
