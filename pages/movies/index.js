import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import Banner from "../../components/Slider/Banner/Banner";
import RowSlider from "../../components/Slider/Row/RowSlider";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const Movies = ({ movieBanner, movieRows }) => {
    return (
        <>
            <section className="w-full to-pink-600">
                {movieBanner && <Banner items={movieBanner} />}
            </section>

            <section className="mt-8 space-y-4 lg:space-y-6">
                {movieRows?.map(({ title, id, hasMore, link, items }) => {
                    if (items.length)
                        return (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="space-y-2 mx-1 lg:mx-4"
                            >
                                <div className="flex items-center justify-between font-semibold mx-2">
                                    <h2 className="text-lg lg:text-xl font-semibold capitalize">
                                        {title}
                                    </h2>

                                    {hasMore && (
                                        <Link href={link}>
                                            <a className="flex items-center text-sm lg:text-base text-pink-600 hover:underline">
                                                <span>See more</span>
                                                <ChevronDoubleRightIcon className="h-4 lg:h-5" />
                                            </a>
                                        </Link>
                                    )}
                                </div>

                                <RowSlider key={id} items={items} />
                            </motion.div>
                        );
                })}
            </section>
        </>
    );
};

export default Movies;

export async function getStaticProps(context) {
    try {
        const res = await fetch(`${process.env.SSR_URL}/movies/featured`);
        const data = await res.json();

        return {
            props: {
                movieBanner: data,
            },
        };
    } catch (error) {
        return {
            props: {
                movieBanner: [],
            },
        };
    }
}
