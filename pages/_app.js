import App from "next/app";
import "antd/dist/antd.css";
import Layout from "../components/Layout";

import MyContext from "../lib/my-Context";
import { Provider } from "react-redux";
import HocComp from "../lib/with-redux";
class MyApp extends App {
  constructor() {
    super();
  }
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    //每次页面切换都会执行
    console.log("app init");

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }
  state = {
    contextVal: "hello"
  };
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Layout>
        <Provider store={reduxStore}>
          <MyContext.Provider value={this.state.contextVal}>
            <Component {...pageProps} />
            <button
              onClick={() => {
                this.setState({ contextVal: this.state.contextVal + 1 });
              }}
            >
              修改context
            </button>
          </MyContext.Provider>
        </Provider>
      </Layout>
    );
  }
}

export default HocComp(MyApp);
