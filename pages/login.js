import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import validator from "validator";
import Input from "../components/Form/Input";
import PasswordInput from "../components/Form/PasswordInput";
import SubmitButton from "../components/Form/SubmitButton";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const emailInputHandler = (e) => {
        if (emailError) setEmailError(null);
        setEmail(e.target.value);
    };

    const passwordInputHandler = (e) => {
        if (passwordError) setPasswordError(null);
        setPassword(e.target.value);
    };

    const formValidate = () => {
        let isValid = true;
        if (!email) {
            setEmailError("Email is required!");
            isValid = false;
        } else if (!validator.isEmail(email)) {
            setEmailError("Invalid email address!");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Password is required!");
            isValid = false;
        } else if (!validator.isLength(password, { min: 6, max: 15 })) {
            setPasswordError("Password must be 6 - 15 characters long");
            isValid = false;
        }

        return isValid;
    };

    const signInHandler = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        if (!formValidate()) return;
        toast.dismiss();

        try {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                return;
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            toast.error("Something went wrong");
        }
    };

    return (
        <form
            className="max-w-sm w-9/12 mx-auto pt-[10vh] lg:pt-[15vh]"
            onSubmit={signInHandler}
        >
            <div className="w-2/4 mb-5 mx-auto">
                <h1 className="text-white font-bold text-xl tracking-wider text-center">
                    Log In
                </h1>
                <div className="w-full h-1 rounded-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600" />
            </div>

            <div className="w-full flex flex-col justify-center items-center space-y-4">
                <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={emailInputHandler}
                    error={emailError}
                />

                <PasswordInput
                    placeholder="Password"
                    value={password}
                    onChange={passwordInputHandler}
                    error={passwordError}
                />
            </div>

            <div className="w-full mt-7">
                <SubmitButton type="submit" text="Log In" loading={isLoading} />
            </div>

            <div className="w-full text-center text-xs lg:text-base mt-2">
                <Link href="/forgotpassword">
                    <a className="text-purple-500 ml-1 underline">
                        Forgot Password?
                    </a>
                </Link>
            </div>

            <div className="text-xs mt-5 px-2 lg:text-sm text-gray-400 text-center">
                Don&apos;t have an Account ?
                <Link href="/signup">
                    <a className="text-purple-500 ml-1 underline">
                        Register Here
                    </a>
                </Link>
            </div>
        </form>
    );
};

export default Login;
