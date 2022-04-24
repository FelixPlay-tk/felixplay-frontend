import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ResendCodeButton({ email }) {
    const [resendSeconds, setResendSeconds] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (resendSeconds > 0) {
            setTimeout(() => setResendSeconds(resendSeconds - 1), 1000);
        } else {
            return;
        }
    }, [resendSeconds]);

    const resendHandler = async () => {
        if (resendSeconds > 0) {
            return;
        }

        if (isLoading) return;

        try {
            setIsLoading(true);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/resendotp`,
                { email: email }
            );

            setIsLoading(false);
            console.log(response);
            toast.success(response.data.message);
        } catch (error) {
            setIsLoading(false);
            if (error.response) toast.error(error.response.data.message);
            else toast.error(error.message);
        }

        setResendSeconds(5);
    };

    return (
        <>
            We have sent a code to your email address. Didn&apos;t receive Code
            ?
            <button
                className="text-purple-600 ml-1 mr-1 cursor-pointer hover:underline"
                type="button"
                disabled={resendSeconds > 0}
                onClick={resendHandler}
            >
                Resend code
            </button>
            {resendSeconds > 0 && `after ${resendSeconds} seconds`}
        </>
    );
}

export default ResendCodeButton;
