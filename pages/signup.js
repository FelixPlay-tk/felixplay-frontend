import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import validator from "validator";
import Input from "../components/Form/Input";
import PasswordInput from "../components/Form/PasswordInput";
import SubmitButton from "../components/Form/SubmitButton";
import { useRouter } from "next/router";
import { useAuthCtx } from "../context/authContext";
import axios from "axios";
import Verification from "../components/Form/Verification";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setconfirmPasswordError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [verifyMode, setVerifyMode] = useState(false);

    const { isLoggedIn } = useAuthCtx();
    const router = useRouter();

    const firstNameChangeHandler = (e) => {
        if (firstNameError) setFirstNameError(null);
        setFirstName(e.target.value);
    };
    const lastNameChangeHandler = (e) => {
        if (lastNameError) setLastNameError(null);
        setLastName(e.target.value);
    };
    const emailChangeHandler = (e) => {
        if (emailError) setEmailError(null);
        setEmail(e.target.value);
    };
    const passwordChangeHandler = (e) => {
        if (passwordError) setPasswordError(null);
        setPassword(e.target.value);
    };
    const confirmPasswordChangeHandler = (e) => {
        if (confirmPassword) setconfirmPasswordError(null);
        setConfirmPassword(e.target.value);
    };
    const formValidate = () => {
        let isValid = true;

        if (!firstName) {
            setFirstNameError("First Name is Required!");
            isValid = false;
        } else if (!validator.isAlpha(firstName)) {
            setFirstNameError("Numbers & Symbols not allowed!");
            isValid = false;
        } else if (!validator.isLength(firstName, { min: 2, max: 15 })) {
            setFirstNameError("First Name must be 2 - 15 characters long!");
            isValid = false;
        }

        if (!lastName) {
            setLastNameError("Last Name is Required!");
            isValid = false;
        } else if (!validator.isAlpha(lastName)) {
            setLastNameError("Numbers & Symbols not allowed!");
            isValid = false;
        } else if (!validator.isLength(lastName, { min: 2, max: 15 })) {
            setLastNameError("Last Name must be 2 - 15 characters long!");
            isValid = false;
        }

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

        if (!confirmPassword) {
            setconfirmPasswordError("Password confirmation is required!");
            isValid = false;
        } else if (!validator.equals(confirmPassword, password)) {
            setconfirmPasswordError("Passwords do not match!");
            isValid = false;
        }

        return isValid;
    };
    const signUpHandler = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        if (!formValidate()) return;
        toast.dismiss();

        try {
            setIsLoading(true);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
                {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                }
            );
            setVerifyMode(true);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.response) return toast.error(error.response.data.message);
            return toast.error(error.message);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn, router]);

    if (verifyMode) return <Verification email={email} />;

    return (
        <form
            className="max-w-sm w-9/12 mx-auto pt-[5vh] lg:pt-[10vh]"
            onSubmit={signUpHandler}
        >
            <div className="w-2/4 mb-5 mx-auto">
                <h1 className="text-white font-bold text-xl tracking-wider text-center">
                    Sign Up
                </h1>
                <div className="w-full h-1 rounded-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600" />
            </div>

            <div>
                <div className="w-full flex flex-col justify-center items-center space-y-4">
                    <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={firstNameChangeHandler}
                        error={firstNameError}
                    />
                    <Input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={lastNameChangeHandler}
                        error={lastNameError}
                    />
                    <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={emailChangeHandler}
                        error={emailError}
                    />
                    <PasswordInput
                        placeholder="Password"
                        value={password}
                        onChange={passwordChangeHandler}
                        error={passwordError}
                    />
                    <PasswordInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        error={confirmPasswordError}
                    />
                </div>

                <div className="text-xs lg:text-sm mt-8 px-2 text-gray-400 text-left">
                    By proceeding you agree to our
                    <Link href="/terms">
                        <a className="text-purple-600 ml-1 mr-1 hover:underline">
                            Terms of Services
                        </a>
                    </Link>
                    &
                    <Link href="/policies">
                        <a className="text-purple-600 ml-1 mr-1 hover:underline">
                            Privacy Policy
                        </a>
                    </Link>
                </div>

                <div className="w-full mt-7">
                    <SubmitButton
                        type="submit"
                        text="Sign Up"
                        loading={isLoading}
                    />
                </div>

                <div className="text-xs mt-5 px-2 lg:text-sm text-gray-400 text-center">
                    Already have an account ?
                    <Link href="/login">
                        <a className="text-purple-500 ml-1 underline">Login</a>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default SignUp;
