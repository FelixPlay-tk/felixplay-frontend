import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Modal from "../Hoc/Modal";
import PasswordInput from "./PasswordInput";

const ChangePassword = ({}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [oldpassword, setOldpassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const closeModdal = () => setModalOpen(false);
    const submitHandler = (e) => {
        e.preventDefault();
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
                        <form
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
                                    value={oldpassword}
                                    onChange={(e) => {
                                        setOldpassword(e.target.value);
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
                                    className="w-full h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"
                                >
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
                        </form>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChangePassword;
