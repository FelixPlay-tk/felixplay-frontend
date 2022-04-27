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
                <div className="relative ml-auto lg:max-h-[550px] xl:max-h-[600px] lg:w-[1156px] overflow-hidden">
                    <Image
                        src={item.banner}
                        alt={item.title}
                        layout="responsive"
                        objectFit="contain"
                        objectPosition="top right"
                        width={1280}
                        height={720}
                        priority
                    />

                    <div className="bottom-0 hidden lg:block absolute z-10 left-0 top-0 w-2/4 bg-gradient-to-r from-black to-transparent" />
                </div>
                <div className="bg-gradient-to-r from-black via-black to-transparent absolute bottom-0 left-0 z-10 h-full w-2/4 hidden lg:block">
                    <div className="h-full w-full flex flex-col justify-center pl-20 pr-14 text-white">
                        <h1 className="font-bold text-4xl uppercase">
                            {item.title}
                        </h1>

                        <div className="mt-2 flex text-xl text-gray-400 font-semibold tracking-wide capitalize">
                            <span className="mr-2">{item.language}</span>•
                            <span className="mx-2">
                                {item.categories.map((c, i) => (
                                    <span className="mx-0.5 capitalize" key={i}>
                                        {c}
                                        {item.categories.length > i + 1 && " •"}
                                    </span>
                                ))}
                            </span>
                            •<span className="mx-2">{item.runtime}</span>
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
