import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import validator from "validator";
import Input from "../components/Form/Input";
import PasswordInput from "../components/Form/PasswordInput";
import SubmitButton from "../components/Form/SubmitButton";
import { useAuthCtx } from "../context/authContext";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const { login, isLoggedIn } = useAuthCtx();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn, router]);

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
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    email: email,
                    password: password,
                }
            );
            setIsLoading(false);

            login(response.data.JWT_TOKEN);
            router.push("/");
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <Head>
                <title>Login - FelixPlay</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <form
                className="max-w-sm w-9/12 mx-auto pt-[5vh] lg:pt-[15vh]"
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
                    <SubmitButton
                        type="submit"
                        text="Log In"
                        loading={isLoading}
                    />
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
        </>
    );
};

export default Login;
