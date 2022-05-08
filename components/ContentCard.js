import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const CategoryItem = ({ item }) => {
    const [showPlayButton, setShowPlayButton] = useState(false);
    return (
        <Link href={`/movies/details/${item._id}`} passHref>
            <div
                onMouseEnter={() => setShowPlayButton(true)}
                onMouseLeave={() => setShowPlayButton(false)}
                className=" h-full w-full rounded-md overflow-hidden relative"
            >
                <Image
                    src={item.banner}
                    alt=""
                    layout="responsive"
                    height={184}
                    width={327}
                    className={`bg-gray-900 cursor-pointer ${
                        !isMobile && showPlayButton && "opacity-50 scale-125"
                    } transition duration-200  `}
                />

                {!isMobile && (
                    <AnimatePresence>
                        {showPlayButton && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute  right-0 left-0 bottom-0 pb-2 flex h-full w-full items-center justify-center cursor-pointer "
                            >
                                <FaPlay className="text-4xl text-pink-500 " />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </Link>
    );
};

export default CategoryItem;
