import Head from "next/head";
import React from "react";

const NotFound = () => {
    return (
        <>
            <Head>
                <title>404 Not Found</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className="text-gray-300  -mt-20 h-screen text-center flex flex-col items-center justify-center">
                <div className="flex gap-4 items-center justify-center">
                    <h1 className="text-base sm:text-3xl">404</h1>
                    <div className="w-0.5 h-full bg-gray-300" />
                    <h2 className="text-base sm:text-xl">
                        This page could not be found
                    </h2>
                </div>
            </div>
        </>
    );
};

export default NotFound;
