import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthCtx } from "../../context/authContext";
import Spinner from "../UI/Spinner";

const WithAuth = ({ children }) => {
    const { authLoading, isLoggedIn } = useAuthCtx();
    const router = useRouter();

    //  redirect to login page if not logged in
    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, authLoading, router]);

    if (!authLoading && isLoggedIn) {
        return <>{children}</>;
    }

    return (
        <div className="flex items-center justify-center pt-[30vh]">
            <Spinner className="animate-spin h-10 text-purple-500" />
        </div>
    );
};

export default WithAuth;
