import React from "react";
import createStore from "../store/store";
const isServer = typeof window === "undefined";
const __NEXT_RESUX_STORE = "__NEXT_RESUX_STORE";

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_RESUX_STORE]) {
    window[__NEXT_RESUX_STORE] = createStore(initialState);
  }
  return window[__NEXT_RESUX_STORE];
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
    let appProps = {};
    if (Comp.getInitialProps === "function") {
      appProps = await Comp.getInitialProps(ctx);
    }
    const reduxStore = getOrCreateStore();
    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    };
  };
  return WithReduxApp;
};
