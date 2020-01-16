import React from "react";
import createStore from "../store/store";
const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE = "__NEXT_REDUX_STORE";

function getOrCreateStore(initialState) {
  console.log("getOrCreateStore", initialState);

  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE]) {
    window[__NEXT_REDUX_STORE] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE];
}

export default Comp => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialState);
    }
    render() {
      const { Component, pageProps, ...rest } = this.props;
      if (pageProps) {
        pageProps.test = "HOC test";
      }
      console.log(Component, pageProps);
      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        ></Comp>
      );
    }
  }

  WithReduxApp.getInitialProps = async ctx => {
    const reduxStore = getOrCreateStore();
    ctx.reduxStore = reduxStore;
    let appProps = {};
    if (Comp.getInitialProps === "function") {
      appProps = await Comp.getInitialProps(ctx);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    };
  };
  return WithReduxApp;
};
