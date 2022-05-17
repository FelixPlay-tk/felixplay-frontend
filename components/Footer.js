/* eslint-disable @next/next/no-img-element */
import Logo from "../assets/logo.png";

function Footer() {
    return (
        <footer className="flex justify-center items-center h-56 bg-black">
            <div className="flex flex-col justify-center items-center">
                <div className="h-10 my-2">
                    <img
                        src={Logo.src}
                        alt=""
                        className="h-full object-contain"
                    />
                </div>
                <p className="text-gray-500 font-semibold tracking-wide">
                    &copy;Copyright 2020
                </p>
            </div>
        </footer>
    );
}

export default Footer;
