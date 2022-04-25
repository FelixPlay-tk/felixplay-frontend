/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthCtx } from "../../context/authContext";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../../assets/logo.png";
import Link from "next/link";

import NavMenu from "./NavMenu";
import { NavData } from "../../Data/data";

const Sidebar = () => {
    const [sidebarVisibility, setSidebarVisibility] = useState(false);
    const [expanded, setExpanded] = useState(null);

    const { authLoading, isLoggedIn, fullName, logout } = useAuthCtx();
    const router = useRouter();

    useEffect(() => {
        if (sidebarVisibility) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [sidebarVisibility]);

    const closeSideBar = () => {
        if (sidebarVisibility) {
            setSidebarVisibility(false);
            setExpanded(null);
        }
    };

    return (
        <>
            <div className="cursor-pointer lg:hidden mr-2">
                <MenuIcon
                    className="h-6"
                    onClick={() => setSidebarVisibility(true)}
                />
            </div>

            <AnimatePresence>
                {sidebarVisibility && (
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: 0 }}
                        exit={{ left: "-100%" }}
                        transition={{ type: "just", duration: 0.2 }}
                        className="fixed top-0 bottom-0 w-full h-full bg-gray-900 z-50 flex flex-col justify-between overflow-y-auto"
                    >
                        <header className="flex items-center justify-center h-16 border-b border-gray-700 bg-gray-900 relative">
                            <img
                                src={Logo.src}
                                alt="Felixplay"
                                className="h-6 object-contain"
                            />

                            <div className="absolute right-0 mx-3 cursor-pointer">
                                <XIcon className="h-6" onClick={closeSideBar} />
                            </div>
                        </header>

                        <nav className="flex-1">
                            <Link href="/">
                                <a
                                    onClick={closeSideBar}
                                    className="sidebar-nav"
                                >
                                    Home
                                </a>
                            </Link>

                            {NavData.map((item, index) => (
                                <NavMenu
                                    key={index}
                                    expanded={expanded}
                                    setExpanded={setExpanded}
                                    closeSideBar={closeSideBar}
                                    index={index}
                                    item={item}
                                />
                            ))}
                        </nav>

                        {!authLoading && !isLoggedIn && (
                            <div className="w-full my-6 px-5 flex flex-col justify-center space-y-3">
                                <button
                                    className="bg-gradient-to-r from-pink-600 to-purple-600 w-full px-2 py-2.5 rounded-full"
                                    onClick={() => {
                                        router.push("/login");
                                        closeSideBar();
                                    }}
                                >
                                    Login
                                </button>

                                <button
                                    className="bg-transparent w-full bg-gradient-to-r p-0.5 from-pink-600 to-purple-600 rounded-full"
                                    onClick={() => {
                                        router.push("/signup");
                                        closeSideBar();
                                    }}
                                >
                                    <div className="bg-gray-900 px-2 py-2 rounded-full">
                                        Register
                                    </div>
                                </button>
                            </div>
                        )}

                        {!authLoading && isLoggedIn && (
                            <div className="w-full my-6 px-5 flex flex-col justify-center space-y-3">
                                <button
                                    className="bg-gradient-to-r from-pink-600 to-purple-600 w-full px-2 py-2.5 rounded-full"
                                    onClick={() => {
                                        router.push("/myaccount");
                                        closeSideBar();
                                    }}
                                >
                                    My Account
                                </button>

                                <button
                                    className="bg-transparent w-full bg-gradient-to-r p-0.5 from-pink-600 to-purple-600 rounded-full"
                                    onClick={() => {
                                        logout();
                                        closeSideBar();
                                    }}
                                >
                                    <div className="bg-gray-900 px-2 py-2 rounded-full">
                                        Log Out
                                    </div>
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
