/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Logo from "../../assets/logo.png";
import {
    AiOutlineUser,
    AiOutlineSearch,
    AiOutlineSetting,
} from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import DropDownMenu from "./DropDownMenu";
import { NavData } from "../../Data/data";
import { useAuthCtx } from "../../context/authContext";
import Sidebar from "../Sidebar/Sidebar";

const Header = () => {
    const { isLoggedIn, authLoading, logout } = useAuthCtx();

    return (
        <header className="sticky top-0 h-20 w-full flex items-center  px-3 lg:px-9 bg-black text-white z-10">
            <Sidebar />
            <span className="select-none cursor-pointer h-8 lg:h-10 flex-1 lg:flex-none">
                <Link href="/" passHref>
                    <img
                        src={Logo.src}
                        alt="FelixPlay"
                        className="h-full object-contain"
                    />
                </Link>
            </span>

            <nav className="hidden lg:flex  mx-10 items-center flex-grow space-x-6 font-semibold tracking-widest uppercase">
                <Link href="/">
                    <a>Home</a>
                </Link>

                {NavData?.map((item, index) => (
                    <DropDownMenu
                        name={item.title}
                        link={item.link}
                        key={index}
                    >
                        {item?.childrens.map((child, i) => (
                            <Link href={child.link} key={i} passHref>
                                <a className="block w-full py-1.5 pl-3 text-white font-normal tracking-normal bg-gray-900 hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all duration-150">
                                    {child.title}
                                </a>
                            </Link>
                        ))}
                    </DropDownMenu>
                ))}

                <Link href="/dmca">
                    <a>DMCA</a>
                </Link>
            </nav>

            <div className="flex justify-center items-center space-x-2">
                <Link href="/search" passHref>
                    <span className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 cursor-pointer transition-all">
                        <AiOutlineSearch className="text-2xl rounded-full" />
                    </span>
                </Link>

                {!authLoading && isLoggedIn && (
                    <div className="dropdown dropdown-hover dropdown-end">
                        <div
                            tabIndex="0"
                            className="ml-1 h-9 w-9 rounded-full hidden lg:flex items-center justify-center bg-gray-900 hover:bg-gray-800 cursor-pointer transition-all outline-none"
                        >
                            <AiOutlineUser className="text-2xl rounded-full" />
                        </div>

                        <ul
                            tabIndex="0"
                            className="menu dropdown-content w-40 "
                        >
                            <div className="w-full flex flex-col overflow-hidden rounded-lg mt-2">
                                <Link href="/myaccount">
                                    <a className="bg-gray-900 hover:bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-3 outline-none">
                                        <AiOutlineSetting className="inline mr-3" />
                                        Account
                                    </a>
                                </Link>

                                <button
                                    className="px-4 py-3 text-left outline-none bg-gray-900 hover:bg-gradient-to-r from-pink-600 to-purple-600"
                                    onClick={logout}
                                >
                                    <FaSignOutAlt className="inline mr-3" />
                                    Log Out
                                </button>
                            </div>
                        </ul>
                    </div>
                )}

                {!authLoading && !isLoggedIn && (
                    <>
                        <Link href="/login">
                            <a className="rounded-2xl text-white  px-1 py-1.5 uppercase tracking-wide text-sm hidden lg:flex lg:justify-center lg:items-center">
                                LOG IN
                            </a>
                        </Link>

                        <Link href="/signup">
                            <a className="flex justify-center items-center py-2 lg:py-1.5 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold tracking-wide rounded-lg text-xs lg:text-sm">
                                SIGN UP
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
