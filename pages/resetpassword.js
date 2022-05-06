import Head from "next/head";
import { useState } from "react";
import PasswordInput from "../components/Form/PasswordInput";
import SubmitButton from "../components/Form/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const Resetpassword = ({ JWT_TOKEN }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const PasswordChangeHandler = (event) => {
    if (passwordError) setPasswordError(null);
    setPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    if (confirmPasswordError) setConfirmPasswordError(null);
    setConfirmPassword(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length === 0 && confirmPassword.length === 0) {
      setPasswordError("Password is required!");
      return setConfirmPasswordError("Confirm Password is required!");
    }

    if (password.length < 6)
      return setPasswordError("Password must be 6 characters long!");

    if (confirmPassword.length < 6)
      return setConfirmPasswordError(
        "Confirm Password must be 6 characters long!"
      );

    if (password !== confirmPassword)
      return setConfirmPasswordError("Passwords not match!");

    if (isLoading) return;

    setIsLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resetpassword`,
        {
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + JWT_TOKEN,
          },
        }
      )
      .then((result) => {
        setIsLoading(false);
        toast.success("Password updated successfully! You can Login now!");
        router.push("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data?.message || err.message);
        setPassword("");
        setConfirmPassword("");
      });
  };

  return (
    <>
      <Head>
        <title>Reset Password - FelixPlay</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <form
        className="max-w-md w-9/12 mx-auto pt-[5vh] lg:pt-[15vh] flex flex-col items-center justify-center"
        onSubmit={submitHandler}
      >
        <div className="mb-5 mx-auto inline-block">
          <h1 className="text-white font-bold text-xl tracking-wider text-center">
            {success ? "Reset Successful" : "Reset Password"}
          </h1>
          <div className="w-full h-1 rounded-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 scale-x-125" />
        </div>
        <div className="w-full flex flex-col justify-center items-center space-y-4">
          <PasswordInput
            placeholder="New Password"
            value={password}
            onChange={PasswordChangeHandler}
            error={passwordError}
          />
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            error={confirmPasswordError}
          />
          <SubmitButton loading={isLoading} text="Submit" type="submit" />
        </div>
      </form>
    </>
  );
};

export default Resetpassword;

export async function getServerSideProps(context) {
  const token = context.query?.token;

  if (!token) {
    return {
      notFound: true,
    };
  }

  try {
    const verifyToken = jwt.verify(token, "forgetpassword");

    if (verifyToken) {
      return {
        props: {
          JWT_TOKEN: token,
        },
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
