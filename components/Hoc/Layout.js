import { Toaster } from "react-hot-toast";
import Footer from "../Footer";
import Header from "../Header/Header";

function Layout({ children }) {
    return (
        <>
            <Toaster />

            <Header />
            <main className="body-minimum-height">{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
