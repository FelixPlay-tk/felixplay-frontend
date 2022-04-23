import { Toaster } from "react-hot-toast";
import Header from "../Header/Header";

function Layout({ children }) {
    return (
        <>
            <Toaster />

            <Header />
            <main>{children}</main>
        </>
    );
}

export default Layout;
