import { useState } from "react";
import OtpInput from "react-otp-input";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";
import Link from "next/link";
import ResendCodeButton from "./ResendCodeButton";
import { CheckCircleIcon } from "@heroicons/react/solid";
import axios from "axios";

const Verification = ({ email }) => {
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [verified, setVerified] = useState(false);

    const otpInputHandler = (otp) => {
        if (otpError) setOtpError(false);
        setOtp(otp);
    };
    const verifyHandler = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        toast.dismiss();

        if (!otp || otp.length < 4) {
            toast.error("Enter valid code", {
                position: "bottom-center",
                className: "mb-6",
            });
            setOtpError(true);
            return setOtp("");
        }

        try {
            setIsLoading(true);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
                {
                    email: email,
                    otp: otp,
                }
            );
            setOtpError(false);
            setVerified(true);
            setIsLoading(false);
        } catch (error) {
            if (error.response) {
                setOtpError(true);
                setIsLoading(false);

                return toast.error(error.response.data.message, {
                    position: "bottom-center",
                    className: "mb-6",
                });
            }

            setOtpError(true);
            setIsLoading(false);

            toast.error(error.message, {
                position: "bottom-center",
                className: "mb-6",
            });
        }
        setOtp("");
    };

    if (verified) {
        return (
            <section className="max-w-sm w-9/12 mx-auto pt-36 flex flex-col items-center justify-center">
                <div className="mb-5 mx-auto inline-block">
                    <h1 className="text-white font-bold text-xl tracking-wider text-center">
                        Verification Successful
                    </h1>
                    <div className="w-full h-1 rounded-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 scale-x-125" />
                </div>

                <div className="w-full flex flex-col justify-center items-center ">
                    <div className="bg-green-500 bg-opacity-10 border border-green-800 px-4 py-4 text-sm sm:text-sm text-green-500 flex items-center rounded-lg">
                        <CheckCircleIcon className="h-12 mr-3" />

                        <div>
                            Your account is successfully verified.
                            <Link href="/login">
                                <a className="mx-1 text-green-400 underline">
                                    Click Here to Log in
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <form
            className="max-w-sm w-8/12 mx-auto pt-[5vh] lg:pt-[10vh]"
            onSubmit={verifyHandler}
        >
            <div className="w-2/4 mb-5 mx-auto">
                <h1 className="text-white font-bold text-xl tracking-wider text-center">
                    Enter OTP
                </h1>
                <div className="w-full h-1 rounded-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600" />
            </div>

            <div>
                <div className="w-full flex flex-col justify-center items-center space-y-4">
                    <OtpInput
                        numInputs={4}
                        isInputNum={true}
                        value={otp}
                        onChange={otpInputHandler}
                        inputStyle="border-2 rounded-md border-purple-600 bg-transparent min-h-[50px] max-h-[50px] min-w-[50px] max-w-[50px] outline-none mx-2"
                        errorStyle="border-2 rounded-md border-red-600 bg-transparent min-h-[50px] max-h-[50px] min-w-[50px] max-w-[50px] outline-none mx-2"
                        isDisabled={isLoading}
                        hasErrored={otpError}
                    />
                </div>

                <div className="text-xs lg:text-sm mt-6 px-2 lg:px-3 text-gray-400 text-center">
                    <ResendCodeButton email={email} />
                </div>

                <div className="w-40 mx-auto mt-7">
                    <SubmitButton
                        type="submit"
                        text="Verify"
                        loading={isLoading}
                    />
                </div>
            </div>
        </form>
    );
};

export default Verification;
