import InfiniteScroll from "react-infinite-scroller";
import { useState, useEffect } from "react";
import Link from "next/link";
import Banner from "../../components/Slider/Banner/Banner";
import RowSlider from "../../components/Slider/Row/RowSlider";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Skaleton from "../../components/Slider/Row/Skaleton";

const Movies = () => {
    const [bannerItems, setBannerItems] = useState([]);
    const [rows, setRows] = useState([]);
    const [hasNext, setHasNext] = useState(true);

    const fetchRows = async (page) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/movies/rows?page=${page}`
        );
        const result = await response.json();

        setRows([...rows, ...result.data]);
        setHasNext(result.hasNext || false);
    };

    useEffect(() => {
        async function fetchBanner() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/movies/featured`
            );
            const data = await res.json();

            if (!data) return;

            setBannerItems(data);
        }

        fetchBanner();
    }, []);

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={fetchRows}
            hasMore={hasNext}
            loader={<Skaleton key={0} />}
        >
            <section className="w-full to-pink-600">
                {!bannerItems.length > 0 && (
                    <div className="pt-[56%] lg:pt-0 lg:h-[650px] w-full aspect-video  overflow-hidden bg-gray-900 animate-pulse" />
                )}
                {bannerItems && <Banner items={bannerItems} />}
            </section>

            <section className="mt-8 space-y-4 lg:space-y-6">
                {rows.map(({ title, id, link, items }) => {
                    if (items.length > 0)
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
                                    {link && (
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
        </InfiniteScroll>
    );
};

export default Movies;
