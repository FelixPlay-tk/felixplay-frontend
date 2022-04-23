import { Router } from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Hoc/Layout";
import "nprogress/nprogress.css";
import "../styles/globals.css";

NProgress.configure({ showSpinner: false });

// progress bar
Router.events.on("routeChangeStart", () => {
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
    NProgress.done();
});
Router.events.on("routeChangeError", () => {
    NProgress.done();
});

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
