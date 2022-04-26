import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Modal from "../Hoc/Modal";
import PasswordInput from "./PasswordInput";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthCtx } from "../../context/authContext";
import Spinner from "../UI/Spinner";

const ChangePassword = ({}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { authToken } = useAuthCtx();

    const closeModdal = () => setModalOpen(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if (loading) return;
        toast.dismiss();

        if (!oldPassword || !password || !confirmPassword)
            return toast.error("All fields are required!");
        if (password.length < 6)
            return toast.error("Password must be 6 characters long!");
        if (password !== confirmPassword)
            return toast.error("Passwords do not match!");

        setLoading(true);

        axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/changepassword`,
                {
                    oldPassword: oldPassword,
                    newPassword: password,
                    confirmPassword: confirmPassword,
                },
                {
                    headers: {
                        Authorization: "Bearer " + authToken,
                    },
                }
            )
            .then((response) => {
                setLoading(false);
                toast.success(response.data.message);
                setModalOpen(false);

                setOldPassword("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch((error) => {
                setLoading(false);
                if (error.response)
                    return toast.error(error.response.data.message);

                return toast.error("something went wrong");
            });
    };

    return (
        <>
            <button
                className="mt-2 bg-gray-900 w-full h-16 px-6 rounded-lg text-left flex items-center justify-between"
                onClick={() => {
                    setModalOpen(true);
                }}
            >
                <span>Change Password</span>
                <ChevronRightIcon className="h-5" />
            </button>

            <AnimatePresence>
                {modalOpen && (
                    <Modal>
                        <motion.form
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 1 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.2 }}
                            className="bg-gray-900 mt-[-10vh] w-[90%] max-w-lg flex flex-col justify-center items-center p-10 lg:p-12 rounded-2xl border border-pink-600"
                            onSubmit={submitHandler}
                        >
                            <div className="mb-5 mx-auto">
                                <h1 className="text-white font-bold text-xl tracking-wider text-center">
                                    Change Password
                                </h1>
                                <div className="w-full h-1 scale-x-150 rounded-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600" />
                            </div>

                            <div className="space-y-2 w-full">
                                <PasswordInput
                                    placeholder="Old Password"
                                    value={oldPassword}
                                    onChange={(e) => {
                                        setOldPassword(e.target.value);
                                    }}
                                />
                                <PasswordInput
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <PasswordInput
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="mt-8 w-full grid lg:grid-cols-2 gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center gap-2"
                                >
                                    {loading && (
                                        <Spinner className="animate-spin h-5 w-5 text-white" />
                                    )}
                                    Update
                                </button>

                                <button
                                    type="button"
                                    className="w-full h-12 bg-transparent bg-gradient-to-tr from-red-600 to-orange-600 rounded-full"
                                    onClick={closeModdal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.form>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChangePassword;
