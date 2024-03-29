/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { isMobile } from "react-device-detect";

const RowItem = ({ item }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <Link href={`/${item.contentType + "s"}/details/${item._id}`} passHref>
            <a className="block w-full overflow-hidden">
                <div
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                    className="relative rounded-lg overflow-hidden mx-1 lg:mx-2"
                >
                    <img
                        src={item.poster}
                        alt={item.title}
                        objectFit="cover"
                        // layout="intrinsic"
                        height={330}
                        width={220}
                        className={`cursor-pointer transition duration-300  object-cover
                        ${showInfo && !isMobile && "scale-110"}`}
                    />

                    {!isMobile && (
                        <AnimatePresence>
                            {showInfo && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{
                                        type: "just",
                                        duration: 0.3,
                                    }}
                                    className="absolute right-0 left-0 bottom-0 w-full bg-gray-900 bg-opacity-30 backdrop-blur rounded-b-lg"
                                >
                                    <div className="mt-2 pb-4 xl:mt-[10%] px-2 space-y-1 text-left text-white">
                                        <h1
                                            className="font-bold text-xs md:text-sm lg:text-base capitalize truncate"
                                            title={item.title?.toUpperCase()}
                                        >
                                            {item.title}
                                        </h1>

                                        <p className="text-xs line-clamp-3">
                                            {item.details
                                                .charAt(0)
                                                .toUpperCase() +
                                                item.details.slice(1)}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
                {isMobile && (
                    <p className="mx-2 capitalize text-xs sm:text-sm lg:text-base mt-1 text-gray-400 lg:font-normal ">
                        {item.title}
                    </p>
                )}
            </a>
        </Link>
    );
};

export default RowItem;
