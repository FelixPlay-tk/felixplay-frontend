import { Router } from "next/router";
import NProgress from "nprogress";
import AuthProvider from "../context/authContext";
import Layout from "../components/Hoc/Layout";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import "../styles/banner.css";
import axios from "axios";

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

// axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
}

export default MyApp;
