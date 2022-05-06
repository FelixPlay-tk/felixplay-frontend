import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { isMobile } from "react-device-detect";

const RowItem = ({ item }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <Link href={`/${item.contentType + "s"}/details/${item._id}`} passHref>
            <a className="rounded-lg overflow-hidden">
                <div
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                    className="relative rounded-lg overflow-hidden mx-1 lg:mx-2"
                >
                    <Image
                        src={item.poster}
                        alt={item.title}
                        layout="responsive"
                        height={330}
                        width={220}
                        className={`cursor-pointer transition duration-300 
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
                                    className="bg-gray-900 backdrop-blur bg-opacity-30 absolute right-0 left-0 bottom-0 "
                                >
                                    <div className="mt-2 pb-4 xl:mt-[10%] px-2 space-y-2  text-left text-white">
                                        <div>
                                            <h1
                                                className="font-bold text-xs md:text-sm lg:text-base capitalize truncate"
                                                title={item.title?.toUpperCase()}
                                            >
                                                {item.title}
                                            </h1>
                                        </div>

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
            </a>
        </Link>
    );
};

export default RowItem;
