import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const BannerItem = ({ item }) => {
    return (
        <Link href={`/${item.contentType + "s"}/details/${item._id}`} passHref>
            <motion.div
                className="relative bg-black cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="relative ml-auto lg:h-[550px] xl:h-[700px] lg:w-[1156px] overflow-hidden">
                    <Image
                        src={item.banner}
                        alt={item.title}
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center right"
                        width={1280}
                        height={720}
                        priority
                    />

                    <div className="bottom-0 hidden lg:block absolute z-10 left-0 top-0 w-2/4 bg-gradient-to-r from-black to-transparent" />
                </div>
                <div className="bg-gradient-to-r from-black via-black to-transparent absolute bottom-0 left-0 z-10 h-full w-2/4 hidden lg:block">
                    <div className="h-full w-full flex flex-col justify-center pl-20 pr-14 text-white">
                        <h1 className="font-bold text-4xl capitalize">
                            {item.title}
                            {item.contentType === "movie" &&
                                ` (${new Date(
                                    item.releaseDate
                                ).getFullYear()})`}
                        </h1>

                        <div className="mt-2 flex text-xl text-gray-400 font-semibold tracking-wide capitalize">
                            <span className="mr-2">{item.language[0]}</span>•
                            <span className="mx-2">{item.categories[0]}</span>•
                            {item.contentType === "show" &&
                                ` ${new Date(item.releaseDate).getFullYear()}`}
                            <span className="mx-2">{item.runtime}</span>
                        </div>
                        <div className="mt-2 text-lg text-gray-300 font-semibold tracking-wide line-clamp-4 capitalize">
                            {item.details}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default BannerItem;
