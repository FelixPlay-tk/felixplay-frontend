import React from "react";
import { useAuthCtx } from "../context/authContext";
import { ChevronRightIcon } from "@heroicons/react/solid";
import WithAuth from "../components/Hoc/WithAuth";

const MyAccount = () => {
    const { fullName, email, logout } = useAuthCtx();

    return (
        <WithAuth>
            <div className="max-w-sm mx-auto w-4/5 pt-2 lg:pt-24">
                <div className="flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="79"
                        height="79"
                        viewBox="0 0 79 79"
                    >
                        <g fill="none">
                            <circle cx="39.5" cy="39.5" r="39.5" fill="#fff" />
                            <path
                                fill="#db2777"
                                d="M0 39.5C0 17.685 17.684 0 39.5 0 61.315 0 79 17.685 79 39.5S61.315 79 39.5 79C17.684 79 0 61.315 0 39.5zm19.792 26.348c5.629 3.93 12.452 6.253 19.914 6.18 7.173 0 13.889-2.179 19.43-5.949 2.045-1.39 1.538-4.555-.854-5.165-.247-.063-.487-.121-.72-.173-4.786-1.11-7.64-2.683-8.56-4.625-.736-1.573-.368-3.701 1.105-6.476 8.744-16.467 7.179-25.718 4.326-30.529-2.854-4.81-8.284-7.493-15.28-7.493-6.994 0-12.517 2.683-15.37 7.586-2.853 4.81-4.418 14.061 4.418 30.436 1.38 2.683 1.84 4.81 1.105 6.383-.92 2.035-3.774 3.608-8.56 4.718l-.053.014c-2.32.617-2.871 3.717-.9 5.093h-.001z"
                            />
                        </g>
                    </svg>
                    <div className="flex flex-col items-center mt-3">
                        <h1 className="text-xl uppercase font-semibold">
                            {fullName}
                        </h1>
                        <div className="text-lg">{email}</div>
                    </div>

                    <div className="mt-8 flex flex-col w-full">
                        <button className="mt-2 bg-gray-900 w-full h-16 px-6 rounded-lg text-left flex items-center justify-between">
                            <span>Change Password</span>
                            <ChevronRightIcon className="h-5" />
                        </button>
                        <button
                            className="mt-2 bg-gray-900 w-full h-16 px-6 rounded-lg text-left flex items-center justify-between"
                            onClick={logout}
                        >
                            <span>Sign Out</span>
                            <ChevronRightIcon className="h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </WithAuth>
    );
};

export default MyAccount;
