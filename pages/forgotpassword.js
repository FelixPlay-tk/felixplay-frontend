import axios from "axios";
import { useState } from "react";
import { isEmail } from "validator";
import Input from "../components/Form/Input";
import SubmitButton from "../components/Form/SubmitButton";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const emailChangeHandler = (e) => {
        if (error) setError(null);
        setEmail(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (isLoading) return;
        if (!isEmail(email)) return setError("Enter a valid email address");

        setIsLoading(true);

        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgetpassword`, {
                email,
            })
            .then((result) => {
                setIsLoading(false);
                setSuccess(result.data?.message);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.response.data?.message || err.message);
            });
    };

    return (
        <form
            onSubmit={submitHandler}
            className="max-w-sm w-9/12 mx-auto pt-[5vh] lg:pt-[15vh]"
        >
            <div className="w-2/4 mb-5 mx-auto">
                <h1 className="text-white font-bold text-xl tracking-wider text-center">
                    Forgot Password
                </h1>
                <div className="w-full h-1 rounded-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600" />
            </div>

            <div className="w-full flex flex-col justify-center items-center space-y-4">
                <Input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={emailChangeHandler}
                    error={error}
                />
                <SubmitButton loading={isLoading} text="Submit" type="submit" />
            </div>
        </form>
    );
};

export default Forgotpassword;
