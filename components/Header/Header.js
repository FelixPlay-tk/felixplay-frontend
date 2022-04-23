/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo.png";
import {
    AiOutlineUser,
    AiOutlineSearch,
    AiOutlineSetting,
} from "react-icons/ai";
import { RiHeartAddFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import DropDownMenu from "./DropDownMenu";
import { NavData } from "../../Data/data";

const Header = () => {
    return (
        <header className="sticky top-0 h-16 w-full flex items-center  px-3 lg:px-9 bg-black text-white z-10">
            <span className="select-none cursor-pointer h-8 lg:h-10">
                <Link href="/" passHref>
                    <img
                        src={Logo.src}
                        alt="FelixPlay"
                        className="h-full object-contain"
                    />
                </Link>
            </span>

            <nav className="hidden lg:flex  mx-10 items-center flex-grow space-x-6 font-semibold tracking-widest uppercase">
                <Link href="/">Home</Link>

                {NavData?.map((item, index) => (
                    <DropDownMenu
                        name={item.title}
                        href={item.title}
                        key={index}
                    >
                        {item?.childrens.map((child, i) => (
                            <Link href={child.link} key={i}>
                                <a className="block w-full py-1.5 pl-3 text-white font-normal tracking-normal bg-gray-900 hover:bg-red-500 transition-all duration-150">
                                    {child.title}
                                </a>
                            </Link>
                        ))}
                    </DropDownMenu>
                ))}

                <Link href="/watchlist">Watchlist</Link>
            </nav>

            <div className="flex justify-center items-center space-x-1.5">
                <Link href="/search" passHref>
                    <span className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 cursor-pointer transition-all">
                        <AiOutlineSearch className="text-2xl rounded-full" />
                    </span>
                </Link>
            </div>
        </header>
    );
};

export default Header;
