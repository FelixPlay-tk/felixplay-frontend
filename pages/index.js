import InfiniteScroll from "react-infinite-scroller";
import { useState, useEffect } from "react";
import Link from "next/link";
import Banner from "../components/Slider/Banner/Banner";
import RowSlider from "../components/Slider/Row/RowSlider";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Skaleton from "../components/Slider/Row/Skaleton";
import axios from "axios";

const HomePage = ({ banner, HasNext, rowitems }) => {
    const [rows, setRows] = useState([...rowitems]);
    const [hasNext, setHasNext] = useState(HasNext);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRows = (page) => {
        if (isLoading) return;
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/browse/rows?page=${page}`)
            .then((res) => {
                setIsLoading(false);
                setHasNext(res.data.hasNext || false);
                setRows([...rows, ...res.data.data]);
            })
            .catch((err) => {
                setIsLoading(false);
                return;
            });
    };

    return (
        <InfiniteScroll
            pageStart={1}
            loadMore={fetchRows}
            hasMore={hasNext}
            loader={<Skaleton key={0} />}
            className="mt-8 space-y-4 lg:space-y-6"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full to-pink-600"
            >
                {!banner.length > 0 && (
                    <div className="pt-[56%] lg:pt-0 lg:h-[650px] w-full aspect-video  overflow-hidden bg-gray-900 animate-pulse" />
                )}
                {banner && <Banner items={banner} />}
            </motion.div>

            <div>
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
            </div>
        </InfiniteScroll>
    );
};

export default HomePage;

export async function getStaticProps(params) {
    try {
        const result = await axios.get(
            `${process.env.SSR_URL}/browse/featured`
        );
        const data = await result.data;

        const rowsRes = await axios.get(
            `${process.env.SSR_URL}/browse/rows?page=${1}`
        );
        const rows = await rowsRes.data;

        // console.log(rows);

        return {
            props: {
                banner: data,
                HasNext: rows.hasNext,
                rowitems: rows.data,
            },
            revalidate: 600,
        };
    } catch (error) {
        console.log(error.message);
        return {
            props: {
                banner: [],
                HasNext: true,
                rowitems: [],
            },
            revalidate: 600,
        };
    }
}
