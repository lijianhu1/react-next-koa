import App, {Container} from "next/app";
import "antd/dist/antd.css";
import Layout from "../components/Layout";
import Router from "next/router"
import MyContext from "../lib/my-Context";
import {Provider} from "react-redux";
import HocComp from "../lib/with-redux";
import Loading from "../components/Loading"
class MyApp extends App {
    constructor() {
        super();
        this.state = {
            contextVal: "hello",
            loading: false
        };
    }

    startLoading = () => {
        this.setState({loading: true})
    };
    stopLoading = () => {
        this.setState({loading: false})
    };

    componentDidMount() {
        Router.events.on("routeChangeStart", this.startLoading);
        Router.events.on("routeChangeComplete", this.stopLoading);
        Router.events.on("routeChangeError", this.stopLoading);
    };

    componentWillUnmount() {
        Router.events.off("routeChangeStart", this.startLoading);
        Router.events.off("routeChangeComplete", this.stopLoading);
        Router.events.off("routeChangeError", this.stopLoading);
    }

    static async getInitialProps(ctx) {
        const {Component} = ctx;
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

    render() {
        const {Component, pageProps, reduxStore} = this.props;
        return (

            <Provider store={reduxStore}>
                {this.state.loading ? <Loading/> : null}

                <Layout>
                    <MyContext.Provider value={this.state.contextVal}>
                        <Component {...pageProps} />
                        <button
                            onClick={() => {
                                this.setState({contextVal: this.state.contextVal + 1});
                            }}
                        >
                            修改context
                        </button>
                    </MyContext.Provider>
                </Layout>
            </Provider>

        );
    }
}

export default HocComp(MyApp);
